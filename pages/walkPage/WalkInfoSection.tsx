import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useWalkStore } from "../../stores/useWalkStore";
import { calculateElapsedTime } from "../../utils/time/calculateElapsedTime";
import { formatTime } from "../../utils/time/formatTime";
import { useLocationTracking } from "../../hooks/useLocationTracking";

export default function WalkInfoSection() {
  const { isWalking, startTime } = useWalkStore();
  const [elapsedTime, setElapsedTime] = useState(0);
  const { totalDistance } = useLocationTracking(isWalking);

  useEffect(() => {
    if (!isWalking || !startTime) {
      setElapsedTime(0);
      return;
    }

    // 1분마다 경과 시간 업데이트
    const interval = setInterval(() => {
      const elapsed = calculateElapsedTime(startTime);
      setElapsedTime(elapsed);
    }, 6000);

    return () => clearInterval(interval);
  }, [isWalking, startTime]);

  // 미터를 킬로미터로 변환 (소수점 2자리)
  const distanceKm = (totalDistance / 1000).toFixed(1);

  return (
    <View className="flex-1 bg-red-200">
      <Text>산책 경과 시간: {formatTime(elapsedTime)}</Text>
      <Text>총 거리: {distanceKm}km</Text>
    </View>
  );
}
