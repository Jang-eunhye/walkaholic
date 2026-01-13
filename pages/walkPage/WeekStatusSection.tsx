import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// 더미 데이터: true = 산책 완료, false = 산책 안함
const weekWalkData = [true, true, false, true, false, false, true];
const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

export default function WeekStatusSection() {
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
          {weekWalkData.map((completed, index) => (
            <View key={index} className="items-center">
              <Text className="text-sm font-bold text-gray-800 mb-1">
                {weekDays[index]}
              </Text>
              <MaterialCommunityIcons
                name={
                  completed
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