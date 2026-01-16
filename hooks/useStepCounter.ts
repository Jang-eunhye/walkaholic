import { useEffect, useRef, useState } from "react";
import { Pedometer } from "expo-sensors";
import { Platform } from "react-native";
import { useWalkStore } from "../stores/useWalkStore";

type StepCountSubscription = {
  remove: () => void;
};

export function useStepCounter(isWalking: boolean) {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [initialSteps, setInitialSteps] = useState<number | null>(null);
  const { saveInitialSteps, initialSteps: savedInitialSteps } = useWalkStore();
  
  const initialStepsRef = useRef<number>(0);
  const subscriptionRef = useRef<StepCountSubscription | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  // Pedometer 사용 가능 여부 및 권한 확인
  useEffect(() => {
    const checkAvailability = async () => {
      console.log("📱 Pedometer 사용 가능 여부 확인 중...");
      const available = await Pedometer.isAvailableAsync();
      console.log("📱 Pedometer 사용 가능:", available);
      setIsAvailable(available);

      if (!available) return;

      if (Platform.OS === 'android') {
        try {
          console.log("🔐 Android 권한 요청 중...");
          const { status } = await Pedometer.requestPermissionsAsync();
          console.log("🔐 권한 상태:", status);
          setHasPermission(status === 'granted');
        } catch (error) {
          console.error("❌ 권한 요청 실패:", error);
          setHasPermission(false);
        }
      } else {
        setHasPermission(true);
      }
    };

    checkAvailability();
  }, []);

  // 산책 추적 로직
  useEffect(() => {
    console.log("🦶 useStepCounter useEffect 실행, isWalking:", isWalking, "savedInitialSteps:", savedInitialSteps);

    if (!isWalking) {
      console.log("🚶 산책 중이 아님, 초기화");
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      setSteps(0);
      setInitialSteps(null);
      initialStepsRef.current = 0;
      isInitializedRef.current = false;
      return;
    }

    if (!isAvailable || !hasPermission) {
      console.log("⏳ Pedometer 사용 불가 또는 권한 없음, isAvailable:", isAvailable, "hasPermission:", hasPermission);
      return;
    }

    // ✅ 저장된 기준점이 있으면 먼저 설정 (앱 재시작 시)
    if (savedInitialSteps !== null && !isInitializedRef.current) {
      console.log("🔄 저장된 기준점 사용:", savedInitialSteps);
      initialStepsRef.current = savedInitialSteps;
      setInitialSteps(savedInitialSteps);
      isInitializedRef.current = true; // ✅ 기준점 설정 완료 표시
    }

    // 실시간 걸음수 추적
    const startTracking = () => {
      try {
        console.log("🏃 watchStepCount 구독 시작");
        subscriptionRef.current = Pedometer.watchStepCount((result) => {
          console.log("📊 watchStepCount 콜백 호출, 현재 총 걸음수:", result.steps, "isInitialized:", isInitializedRef.current);
          
          // ✅ 기준점이 설정되지 않았으면 설정 (새로운 산책 시작 시)
          if (!isInitializedRef.current) {
            console.log("📍 새로운 기준점 설정:", result.steps);
            initialStepsRef.current = result.steps;
            setInitialSteps(result.steps);
            saveInitialSteps(result.steps);
            isInitializedRef.current = true;
            setSteps(0);
            console.log("✅ 기준점 설정 완료, 산책 걸음수: 0");
            return;
          }

          // ✅ 기준점 설정 후 차이 계산 (저장된 기준점 사용)
          const currentSteps = result.steps - initialStepsRef.current;
          const finalSteps = Math.max(0, currentSteps);
          console.log("📈 걸음수 계산:");
          console.log("  - 현재 총 걸음수 (디바이스):", result.steps);
          console.log("  - 기준점 걸음수:", initialStepsRef.current);
          console.log("  - 산책 중 걸음수:", finalSteps);
          setSteps(finalSteps);
        });
      } catch (error) {
        console.error("❌ 만보기 추적 시작 실패:", error);
      }
    };

    startTracking();

    return () => {
      console.log("🧹 cleanup 실행");
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [isWalking, isAvailable, hasPermission, savedInitialSteps, saveInitialSteps]);

  return {
    steps,
    isAvailable,
    initialSteps,
  };
}