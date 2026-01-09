import { StyleSheet, View, Image, Text } from "react-native";
import colors from "../styles/colors";


export default function AppHeader() {
  return <View style={styles.container}>
    <Image
            source = {require("../../assets/images/icon1.png")}
            style = {{
              height: 45,
              width: 45,
              marginRight: 300,
              marginTop: 40,
            }}
           
          />
    <Text style = {styles.text}>Candy Craze</Text>
  </View>;
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: colors.dark,
    alignItems: 'center',
  },
  text: {
    color: colors.light,
    fontSize: 27,
    marginTop:-30,
    fontFamily: "Georgia",
  },
});