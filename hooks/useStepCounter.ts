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
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);

      if (!available) return;

      if (Platform.OS === 'android') {
        try {
          const { status } = await Pedometer.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        } catch (error) {
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
    if (!isWalking) {
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
      return;
    }

    // 저장된 기준점이 있으면 사용 (앱 재시작 시)
    if (savedInitialSteps !== null && !isInitializedRef.current) {
      initialStepsRef.current = savedInitialSteps;
      setInitialSteps(savedInitialSteps);
      isInitializedRef.current = true;
    }

    // 실시간 걸음수 추적
    const startTracking = () => {
      try {
        subscriptionRef.current = Pedometer.watchStepCount((result) => {
          // 기준점이 설정되지 않았으면 설정
          if (!isInitializedRef.current) {
            // 저장된 기준점이 없을 때만 현재 걸음수를 기준점으로 사용
            const baseSteps = savedInitialSteps !== null ? savedInitialSteps : result.steps;
            
            initialStepsRef.current = baseSteps;
            setInitialSteps(baseSteps);
            
            // 저장된 기준점이 없을 때만 저장 (새로운 산책)
            if (savedInitialSteps === null) {
              saveInitialSteps(result.steps);
            }
            
            isInitializedRef.current = true;
            setSteps(0);
            return;
          }

          // 기준점 설정 후 차이 계산
          const currentSteps = result.steps - initialStepsRef.current;
          setSteps(Math.max(0, currentSteps));
        });
      } catch (error) {
        console.error("만보기 추적 시작 실패:", error);
      }
    };

    startTracking();

    return () => {
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