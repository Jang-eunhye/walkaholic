import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WalkPage from "../pages/WalkPage";
import WeatherPage from "../pages/WeatherPage";
import CalendarPage from "../pages/CalendarPage";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Walk"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#3B82F6",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
          },
        }}
      >
        <Tab.Screen
          name="Walk"
          component={WalkPage}
          options={{
            tabBarLabel: "산책",
          }}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherPage}
          options={{
            tabBarLabel: "날씨",
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarPage}
          options={{
            tabBarLabel: "달력",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
