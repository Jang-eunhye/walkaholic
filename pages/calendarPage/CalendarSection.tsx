import { View } from "react-native";
import { Calendar } from "react-native-calendars";

// 더미 데이터: 월별 산책 완료 여부 배열 (true = 산책 완료, false = 산책 안함)
// 키: "YYYY-MM" 형식, 값: 해당 월의 일수만큼의 boolean 배열
const walkDataByMonth: Record<string, boolean[]> = {
  "2025-12": [
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
  ],
  "2026-01": [
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
  ],
};

export default function CalendarSection() {
  // 월별 배열을 markedDates 객체로 변환
  const markedDates = Object.entries(walkDataByMonth).reduce(
    (acc, [monthKey, completedArray]) => {
      const [year, month] = monthKey.split("-");
      completedArray.forEach((completed, index) => {
        if (completed) {
          const day = String(index + 1).padStart(2, "0");
          const dateString = `${year}-${month}-${day}`;
          acc[dateString] = { marked: true, dotColor: "green" };
        }
      });
      return acc;
    },
    {} as Record<string, { marked: boolean; dotColor: string }>
  );

  return (
    <View className="border border-orange-500 mb-4">
      <Calendar
        // 기본 설정
        current={new Date().toISOString().split("T")[0]}
        // 마커 표시 (산책 완료 날짜)
        markedDates={markedDates}
        // 날짜 선택 시
        onDayPress={(day) => {
          // console.log("선택된 날짜:", day.dateString);
        }}
        // 월 변경 시
        onMonthChange={(month) => {
          // console.log("변경된 월:", month);
        }}
        // 한국어 설정
        monthFormat={"yyyy년 MM월"}
        // 헤더 화살표 표시
        hideArrows={false}
        // 월요일부터 시작
        firstDay={1}
      />
    </View>
  );
}
