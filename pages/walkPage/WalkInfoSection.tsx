import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useWalkStore } from "../../stores/useWalkStore";
import { calculateElapsedTime } from "../../utils/time/calculateElapsedTime";
import { formatTime } from "../../utils/time/formatTime";

export default function WalkInfoSection() {
  const { isWalking, startTime } = useWalkStore();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isWalking || !startTime) {
      setElapsedTime(0);
      return;
    }

    // 1분마다 경과 시간 업데이트
    const interval = setInterval(() => {
      const elapsed = calculateElapsedTime(startTime);
      setElapsedTime(elapsed);
      console.log(elapsed);
    }, 6000);

    return () => clearInterval(interval);
  }, [isWalking, startTime]);

  return (
    <View className="flex-1 bg-red-200">
      <Text>산책 경과 시간: {formatTime(elapsedTime)}</Text>
    </View>
  );
}
