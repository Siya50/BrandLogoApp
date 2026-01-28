import { AuthProvider } from "@/components/AuthProvider";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <StatusBar style="light"/>
        <Slot />
      </AuthProvider>
      
    </>

  );
}
