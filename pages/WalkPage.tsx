import { View } from "react-native";
import WeekStatusSection from "./walkPage/WeekStatusSection";
import IconSection from "./walkPage/IconSection";
import WalkButtonSection from "./walkPage/WalkButtonSection";

export default function WalkPage() {
  return (
    <View className="flex-1 bg-white p-4">
      {/* 주간산책현황영역 */}
      <View className="flex-1">
        <WeekStatusSection />
      </View>

      {/*아이콘 영역*/}
      <View className="flex-[4] bg-green-200 items-center justify-center">
        <IconSection />
      </View>

      {/*산책 시작/종료 버튼*/}
      <View className="flex-1 bg-blue-200 items-center justify-center">
        <WalkButtonSection />
      </View>
    </View>
  );
}
