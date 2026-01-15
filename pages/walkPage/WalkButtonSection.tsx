import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWalkStore } from "../../stores/useWalkStore";

export default function WalkButtonSection() {
  const { isWalking, startWalk, stopWalk } = useWalkStore();

  const handlePress = () => {
    if (isWalking) {
      stopWalk();
    } else {
      startWalk();
    }
  };

  return (
    <View className="items-center justify-center w-full px-4">
      <TouchableOpacity
        onPress={handlePress}
        className={`rounded-full px-12 py-4 flex-row items-center justify-center ${
          isWalking ? "bg-red-600" : "bg-green-600"
        }`}
        activeOpacity={0.5}
      >
        <Ionicons 
          name={isWalking ? "stop-outline" : "walk-outline"} 
          size={24} 
          color="white" 
        />
        <Text className="text-white text-xl font-bold ml-2">
          {isWalking ? "산책 종료" : "산책 시작"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
