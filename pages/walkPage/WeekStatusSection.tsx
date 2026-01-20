import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useWalkStore } from "../../stores/useWalkStore";

const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

export default function WeekStatusSection() {
  const [weeklyKm, setWeeklyKm] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const getWeeklyStats = useWalkStore((state) => state.getWeeklyStats);

  useEffect(() => {
    const loadWeeklyStats = async () => {
      const stats = await getWeeklyStats();
      setWeeklyKm(stats);
    };
    loadWeeklyStats();
  }, [getWeeklyStats]);
  
  return (
    <View className="flex-1">
      {/*날짜 영역*/}
      <View className="flex-1 bg-red-200 justify-center">
        <Text className="text-2xl font-bold text-gray-800">
          2026년 1월 첫째주
        </Text>
      </View>

      {/*이번주 산책 현황*/}
      <View className="flex-[2] bg-yellow-200 items-center justify-center">
        <View className="flex-row justify-between items-center w-full px-4">
          {weeklyKm.map((km, index) => (
            <View key={index} className="items-center">
              <Text className="text-sm font-bold text-gray-800 mb-1">
                {weekDays[index]}
              </Text>
              <MaterialCommunityIcons
                name={
                  km > 0
                    ? "checkbox-marked-circle"
                    : "checkbox-blank-circle-outline"
                }
                size={36}
                color="green"
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}