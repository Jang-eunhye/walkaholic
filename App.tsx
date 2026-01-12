import "./global.css";
import { StatusBar } from "expo-status-bar";
import { QueryProvider } from "./providers/QueryProvider";
import TabNavigator from "./components/TabNavigation";
import { View } from "react-native";

export default function App() {
  return (
    <QueryProvider>
      <View className="flex-1">
        <TabNavigator />
        {/* 상태바 설정 */}
        <StatusBar style="auto" />
      </View>
    </QueryProvider>
  );
}
