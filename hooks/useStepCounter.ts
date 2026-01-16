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
  const { startTime } = useWalkStore();
  
  const subscriptionRef = useRef<StepCountSubscription | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    // 산책 중이 아님
    if (!isWalking || !startTime) {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setSteps(0);
      return;
    }

    // 가능 여부 체크
    if (!isAvailable || !hasPermission) {
      return;
    }

    // watchStepCount는 watch 시작 시점부터의 걸음수를 반환
    subscriptionRef.current = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [isWalking, isAvailable, hasPermission, startTime]);

  return {
    steps,
    isAvailable,
  };
}