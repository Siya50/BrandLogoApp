import React from "react";
import { Text, View, Image } from "react-native";
import defaultStyles from "../styles/defaultStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Browse() {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Screen1</Text>
      
    </SafeAreaView>
  );
}
