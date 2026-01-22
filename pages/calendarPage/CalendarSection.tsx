import { View } from "react-native";
import { Calendar } from "react-native-calendars";

interface CalendarSectionProps {
  markedDates: Record<string, { marked: boolean; dotColor: string }>;
  onMonthChange: (month: { month: number; year: number }) => void;
}

export default function CalendarSection({ markedDates, onMonthChange }: CalendarSectionProps) {
  return (
    <View className="border border-orange-500 mb-4">
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        markedDates={markedDates}
        onDayPress={(day) => {
          // console.log("선택된 날짜:", day.dateString);
        }}
        onMonthChange={onMonthChange}
        monthFormat={"yyyy년 MM월"}
        hideArrows={false}
        firstDay={1}
      />
    </View>
  );
}