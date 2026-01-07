import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";

export default function Screen1() {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.titleText}>Screen 1</Text>
    </View>
  );
}