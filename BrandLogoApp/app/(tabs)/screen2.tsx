import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";

export default function Screen2() {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.titleText}>Screen 2</Text>
    </View>
  );
}