import { View } from "react-native";
import CalendarSection from "./calendarPage/CalendarSection";
import StatisticsSection from "./calendarPage/StatisticsSection";

export default function CalendarPage() {
  return (
    <View className="flex-1 p-4">
      {/* 달력 영역 */}
      <CalendarSection />

      {/* 통계 영역 */}
      <StatisticsSection />
    </View>
  );
}
