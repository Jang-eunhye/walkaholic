import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import WalkPage from "../pages/WalkPage";
import WeatherPage from "../pages/WeatherPage";
import CalendarPage from "../pages/CalendarPage";

const Tab = createBottomTabNavigator();
const DARK_GREEN = "#286917";

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Walk"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: DARK_GREEN,
          tabBarInactiveTintColor: DARK_GREEN,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            paddingVertical: 2,
            alignItems: "center",
            justifyContent: "center",
          },
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
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "footsteps" : "footsteps-outline"}
                size={28}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherPage}
          options={{
            tabBarLabel: "날씨",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "sunny" : "sunny-outline"}
                size={28}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarPage}
          options={{
            tabBarLabel: "달력",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "calendar-clear" : "calendar-clear-outline"}
                size={28}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
