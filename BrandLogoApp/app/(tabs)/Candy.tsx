import React from "react";
import { Text, View } from "react-native";
import defaultStyles from "../styles/defaultStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Candy() {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Screen3</Text>
    </SafeAreaView>
  );
}
