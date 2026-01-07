import { StyleSheet } from "react-native";
import colors from "./colors";

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light, // soft beige background
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  text: {
    fontSize: 16,
    fontFamily: "lucida grande",
    color: colors.text.primary, // main dark text
  },

  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Georgia-BoldItalic",
    color: colors.primary, // caramel accent for titles
    marginBottom: 2,
    marginTop: 0,
  },

  buttonText: {
    fontSize: 18,
    fontFamily: "lucida grande",
    color: colors.text.inverse, // light text on dark button
    margin: 7,
  },

  buttonContainer: {
    height: 90,
    width: 90,
    borderRadius: 45, // React Native requires numbers, not percentages
    borderWidth: 3,
    borderColor: colors.border,
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 5,
    backgroundColor: colors.secondary, // darker caramel button
  },
});

export default defaultStyles;
