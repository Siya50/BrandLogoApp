import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyles from "../../styles/defaultStyles";

export default function Buy() {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Screen2</Text>
      
    </SafeAreaView>
  );
}
