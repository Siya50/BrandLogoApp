import React from "react";
import { Text, View } from "react-native";
import defaultStyles from "../styles/defaultStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Buy() {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Screen2</Text>
    </SafeAreaView>
  );
}
