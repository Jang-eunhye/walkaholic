import { View, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useWalkStore } from "../../stores/useWalkStore";
import { calculateElapsedTime } from "../../utils/time/calculateElapsedTime";
import { formatTime } from "../../utils/time/formatTime";
import { useLocationTracking } from "../../hooks/useLocationTracking";
import { useStepCounter } from "../../hooks/useStepCounter";
import { calculateCalories } from "../../utils/stats/calculateCalories";
import { formatCalories, formatDistance, formatNumber } from "../../utils/format/formatStats";

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
    <View className="flex-1 justify-center items-center">
      {/* 메인 타이머 섹션 */}
      <View className="items-center mb-16">
        <Text className="text-base text-gray-500 mb-2">경과 시간</Text>
        <Text className="text-5xl font-bold text-gray-900 tracking-tight">
          {formatTime(elapsedTime)}
        </Text>
      </View>

      {/* 통계 그리드 */}
      <View className="flex-row justify-between w-full">
        {/* 거리 */}
        <View className="flex-1 items-center py-4">
          <Text className="text-base text-gray-500 mb-2">거리</Text>
          <Text className="text-2xl font-semibold text-gray-900">
            {formatDistance(totalDistance)}
          </Text>
        </View>

        <View className="w-px bg-gray-200" />

        {/* 걸음수 */}
        <View className="flex-1 items-center py-4">
          <Text className="text-base text-gray-500 mb-2">걸음수</Text>
          <Text className="text-2xl font-semibold text-gray-900">
            {isAvailable ? formatNumber(steps) : "-"}
          </Text>
        </View>

        <View className="w-px bg-gray-200" />

        {/* 칼로리 */}
        <View className="flex-1 items-center py-4">
          <Text className="text-base text-gray-500 mb-2">칼로리</Text>
          <Text className="text-2xl font-semibold text-gray-900">
            {formatCalories(calculateCalories(steps))}
          </Text>
        </View>
      </View>
    </View>
  );
}
