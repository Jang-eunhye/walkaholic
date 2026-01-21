import { View } from "react-native";
import WeekStatusSection from "./walkPage/WeekStatusSection";
import IconSection from "./walkPage/IconSection";
import WalkButtonSection from "./walkPage/WalkButtonSection";
import WalkInfoSection from "./walkPage/WalkInfoSection";
import { useWalkStore } from "../stores/useWalkStore";
import { useStepCounter } from "../hooks/useStepCounter";

export default function WalkPage() {
  const { isWalking } = useWalkStore();
  
  return (
    <View className="flex-1 bg-white p-4">
      {isWalking ? (
        <View className="flex-[5]">
          <WalkInfoSection />
        </View>
      ) : (
        // 주간산책현황영역
          <View className="flex-[5]">
            <WeekStatusSection />
          </View>
      )}

      {/*산책 시작/종료 버튼*/}
      <View className="flex-1 bg-blue-200 items-center justify-center">
        <WalkButtonSection />
      </View>
    </View>
  );
}
