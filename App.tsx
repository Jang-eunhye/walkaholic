import "./global.css";
import { StatusBar } from "expo-status-bar";
import { QueryProvider } from "./providers/QueryProvider";
import TabNavigator from "./components/TabNavigation";

export default function App() {
  return (
    <QueryProvider>
      <TabNavigator />
      {/* 상태바 설정 */}
      <StatusBar style="auto" />
    </QueryProvider>
  );
}
