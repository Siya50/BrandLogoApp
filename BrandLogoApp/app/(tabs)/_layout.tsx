import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Easing } from "react-native";
import colors from "../styles/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // Tab bar colors
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.muted,

        // Header styling
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.text.inverse,
        headerShadowVisible: false,

        // Tab bar styling
        tabBarStyle: {
          backgroundColor: colors.light,
          borderRightColor: colors.border,
        },

        tabBarPosition: "left",

        // Animation
        animation: "fade",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          },
        },
      }}
    >
      <Tabs.Screen
        name="Browse"
        options={{
          headerTitle: "Shop",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "Georgia",
            fontWeight: "300",
          },
        }}
      />

      <Tabs.Screen
        name="Candy"
        options={{
          headerTitle: "Types",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "Georgia",
            fontWeight: "300",
          },
        }}
      />

      <Tabs.Screen
        name="Buy"
        options={{
          headerTitle: "Checkout",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "school" : "school-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "Georgia",
            fontWeight: "300",
          },
        }}
      />
    </Tabs>
  );
}
