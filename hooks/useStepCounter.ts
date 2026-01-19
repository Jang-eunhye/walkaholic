import { useEffect, useRef, useState } from "react";
import { Pedometer } from "expo-sensors";
import { Platform } from "react-native";
import { useWalkStore } from "../stores/useWalkStore";

type StepCountSubscription = {
  remove: () => void;
};

export function useStepCounter(isWalking: boolean) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const { startTime, saveSteps } = useWalkStore();
  
  const subscriptionRef = useRef<StepCountSubscription | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (!isWalking || !startTime) {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      saveSteps(0);
      return;
    }

    if (!isAvailable || !hasPermission) {
      return;
    }

    subscriptionRef.current = Pedometer.watchStepCount((result) => {
      saveSteps(result.steps); // store에 저장
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [isWalking, isAvailable, hasPermission, startTime, saveSteps]);

  return {
    isAvailable,
  };
}