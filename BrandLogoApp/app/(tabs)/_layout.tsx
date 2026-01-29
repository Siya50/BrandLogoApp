import Auth from "@/components/Auth";
import { useAuth } from "@/components/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Easing, View } from "react-native";
import AppHeader from "../../components/AppHeader";
import colors from "../../styles/colors";
export default function TabsLayout() {
  const { session } = useAuth();
  if (session === null) {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader />
        <Auth/>
      </View>
    );
  }
  return (
    <View style = {{flex:1}}>
      <AppHeader/>
      <Tabs
        screenOptions={{
          // Tab bar colors
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text.muted,

          headerShown: false,
          headerTintColor: colors.text.inverse,
          headerShadowVisible: false,

          // Tab bar styling
          tabBarStyle: {
            backgroundColor: colors.light,
            borderRightColor: colors.border,
          },

          tabBarPosition: "bottom",

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
          name="index"
          options={{
            headerTitle: "Shop",
            headerTitleAlign: "center",
            headerTitleStyle: {
              marginTop: -70,
              fontFamily: 'Georgia',
              color: colors.light,
            },
            
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
            headerTitleAlign: "center",
            headerTitleStyle: {
              marginTop: -70,
            },
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
            headerTitleAlign: "center",
            headerTitleStyle: {
              marginTop: -70,
            },
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
    </View>
  );
}
