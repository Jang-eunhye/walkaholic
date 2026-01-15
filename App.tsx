import "./global.css";
import { StatusBar } from "expo-status-bar";
import { QueryProvider } from "./providers/QueryProvider";
import TabNavigator from "./components/TabNavigation";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useWalkStore } from "./stores/useWalkStore";

export default function App() {
  useEffect(() => {
    useWalkStore.getState().loadWalkState();
  }, []);
  
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <SafeAreaView edges={["top"]} className="flex-1">
          <TabNavigator />
          {/* 상태바 설정 */}
          <StatusBar style="auto" />
        </SafeAreaView>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
