import { View } from "react-native";
import WeekStatusSection from "./walkPage/WeekStatusSection";
import WalkButtonSection from "./walkPage/WalkButtonSection";
import WalkInfoSection from "./walkPage/WalkInfoSection";
import { useWalkStore } from "../stores/useWalkStore";

export default function WalkPage() {
  const { isWalking } = useWalkStore();
  
  return (
    <View className="flex-1 p-4 bg-white">
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
      <View className="flex-1 items-center justify-center">
        <WalkButtonSection />
      </View>
    </View>
  );
}
