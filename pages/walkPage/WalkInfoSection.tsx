import { View, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useWalkStore } from "../../stores/useWalkStore";
import { calculateElapsedTime } from "../../utils/time/calculateElapsedTime";
import { formatTime } from "../../utils/time/formatTime";
import { useLocationTracking } from "../../hooks/useLocationTracking";
import { useStepCounter } from "../../hooks/useStepCounter";
import { calculateCalories } from "../../utils/stats/calculateCalories";
import { formatDistance, formatNumber } from "../../utils/format/formatStats";

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

  return (
    <View className="flex-1">
      <Text>산책 경과 시간: {formatTime(elapsedTime)}</Text>
      <Text>총 거리: {formatDistance(totalDistance)}</Text>
      <Text>
        총 걸음수: {isAvailable ? `${formatNumber(steps)}걸음` : "-"}
      </Text>
      <Text>칼로리 소모량: {calculateCalories(steps)}kcal</Text>
    </View>
  );
}