import { View, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useWalkStore } from "../../stores/useWalkStore";
import { calculateElapsedTime } from "../../utils/time/calculateElapsedTime";
import { formatTime } from "../../utils/time/formatTime";
import { useLocationTracking } from "../../hooks/useLocationTracking";
import { useStepCounter } from "../../hooks/useStepCounter";

export default function WalkInfoSection() {
  const { isWalking, startTime, saveDistance, distance, steps } = useWalkStore();
  const [elapsedTime, setElapsedTime] = useState(0);
  const { totalDistance } = useLocationTracking(isWalking, distance || 0);
  const { isAvailable } = useStepCounter(isWalking);
  const distanceRef = useRef(totalDistance);

  useEffect(() => {
    distanceRef.current = totalDistance;
  }, [totalDistance]);

  useEffect(() => {
    if (!isWalking || !startTime) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = calculateElapsedTime(startTime);
      setElapsedTime(elapsed);
      saveDistance(distanceRef.current);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [isWalking, startTime]);

  const distanceKm = (totalDistance / 1000).toFixed(1);

  return (
    <View className="flex-1 bg-red-200">
      <Text>산책 경과 시간: {formatTime(elapsedTime)}</Text>
      <Text>총 거리: {distanceKm}km</Text>
      <Text>
        총 걸음수: {isAvailable ? `${steps.toLocaleString()}걸음` : "-"}
      </Text>
      <Text>칼로리 소모량: {Math.round(steps * 0.04)}kcal</Text>
    </View>
  );
}