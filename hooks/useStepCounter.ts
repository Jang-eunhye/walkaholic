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
  const { saveInitialSteps } = useWalkStore();
  const subscriptionRef = useRef<StepCountSubscription | null>(null);
  const initialStepsRef = useRef<number>(0);
  const isInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    // Pedometer 사용 가능 여부 및 권한 확인
    const checkAvailability = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);

      if (!available) {
        return;
      }

      // Android에서 권한 요청
      if (Platform.OS === 'android') {
        try {
          const { status } = await Pedometer.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        } catch (error) {
          setHasPermission(false);
        }
      } else {
        setHasPermission(true); // iOS는 자동 처리
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

    // 실시간 걸음수 추적
    const startTracking = () => {
      try {
        subscriptionRef.current = Pedometer.watchStepCount((result) => {
          if (!isInitializedRef.current) {
            // 첫 번째 콜백에서 기준점 설정
            initialStepsRef.current = result.steps;
            setInitialSteps(result.steps);
            
            // 기준점 설정되면 저장
            saveInitialSteps(result.steps);

            isInitializedRef.current = true;
            setSteps(0);
            return;
          }

          // 이후 콜백에서는 차이 계산
          const currentSteps = result.steps - initialStepsRef.current;
          const finalSteps = Math.max(0, currentSteps);
          setSteps(finalSteps);
        });
      } catch (error) {
        // 에러 처리 (필요시)
      }
    };

    startTracking();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [isWalking, isAvailable, hasPermission]);

  return {
    steps,
    isAvailable,
    initialSteps,
  };
}