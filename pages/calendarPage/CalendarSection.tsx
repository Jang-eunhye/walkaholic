import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useMemo } from "react";

interface CalendarSectionProps {
  markedDates: Record<string, any>;
  onMonthChange: (month: { month: number; year: number }) => void;
}

export default function CalendarSection({ markedDates, onMonthChange }: CalendarSectionProps) {
  const todayString = new Date().toISOString().split("T")[0];
  
  const markedDatesWithToday = useMemo(() => {
    const result = { ...markedDates };
    const isWalkedToday = !!result[todayString];
    
    if (isWalkedToday) {
      result[todayString] = {
        ...result[todayString],
        customStyles: {
          container: {
            backgroundColor: "#10B981",
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "#059669",
          },
          text: {
            color: "#ffffff",
          },
        },
      };
    } else {
      result[todayString] = {
        customStyles: {
          container: {
            borderWidth: 2,
            borderColor: "#059669",
            borderRadius: 50,
          },
        },
      };
    }
    
    return result;
  }, [markedDates, todayString]);

  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 mb-4">
      <Calendar
        current={todayString}
        markedDates={markedDatesWithToday}
        onDayPress={(day) => {
          // console.log("선택된 날짜:", day.dateString);
        }}
        onMonthChange={onMonthChange}
        monthFormat={"yyyy년 MM월"}
        hideArrows={false}
        firstDay={1}
        markingType="custom"
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#6B7280",
          selectedDayBackgroundColor: "#10B981",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#3B82F6",
          dayTextColor: "#111827",
          textDisabledColor: "#D1D5DB",
          dotColor: "#10B981",
          selectedDotColor: "#ffffff",
          arrowColor: "#374151",
          monthTextColor: "#111827",
          indicatorColor: "#3B82F6",
          textDayFontWeight: "500",
          textMonthFontWeight: "600",
          textDayHeaderFontWeight: "600",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
      />
    </View>
  );
}