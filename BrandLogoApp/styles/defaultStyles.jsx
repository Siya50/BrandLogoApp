import { StyleSheet } from "react-native";
import colors from "./colors";

const defaultStyles = StyleSheet.create({
  container: {
    flex:1,
    padding: 16,
    paddingHorizontal:20,
    backgroundColor: colors.light, // soft beige background
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
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
    color: colors.dark, // light text on dark button
    margin: 7,
  },
  textfield: {
    height: 60,
    width: 300,
    borderRadius: 10,
    borderWidth: 20,
    justifyContent: "space-around",
    margin: 10,
    backgroundColor: colors.primary, // darker caramel button
  },

  buttonContainer: {
    height: 70,
    width: 300,
    borderRadius: 15, 
    borderWidth: 3,
    borderColor: colors.border,
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 5,
    backgroundColor: colors.light, // darker caramel button
  },
  quizContainers: {
    flexDirection: "row",
  },
});

export default defaultStyles;
