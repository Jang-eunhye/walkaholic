import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useWalkStore } from "../../stores/useWalkStore";
import IconSection from "./IconSection";
import { calculateStage } from "../../utils/stats/calculateStage";
import { formatDistance } from "../../utils/format/formatStats";

const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

export default function WeekStatusSection() {
  const [weeklyMeters, setWeeklyMeters] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const iconLevel = calculateStage(weeklyMeters.reduce((acc, m) => acc + m, 0) / 1000);
  const getWeeklyStats = useWalkStore((state) => state.getWeeklyStats);

  useEffect(() => {
    const loadWeeklyStats = async () => {
      const stats = await getWeeklyStats();
      setWeeklyMeters(stats);
    };
    loadWeeklyStats();
  }, [getWeeklyStats]);
  
  return (
      <View className="flex-1">
        {/*날짜 영역*/}
        <View className="flex-1 justify-center">
          <Text className="text-2xl font-bold text-gray-800">
            2026년 1월 첫째주
          </Text>
        </View>

        {/*이번주 산책 현황*/}
        <View className="flex-[2] border border-gray-300 rounded-xl items-center justify-center">
          <View className="flex-row justify-between items-center w-full px-4">
            {weeklyMeters.map((meters, index) => (
              <View key={index} className="items-center">
                <Text className="text-sm font-bold text-gray-800 mb-1">
                  {weekDays[index]}
                </Text>
                <MaterialCommunityIcons
                  name={
                    meters > 0
                      ? "checkbox-marked-circle"
                      : "checkbox-blank-circle-outline"
                  }
                  size={36}
                  color="green"
                />
                <Text className="text-xs text-gray-600 mt-1">
                  {meters > 0 ? formatDistance(meters) : ""}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="flex-[12] items-center justify-center">
          <IconSection iconLevel={iconLevel} />
        </View>
      </View>
  );
}