import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import colors from "../app/styles/colors";

/**  Utilized ChatGPT to figure out how to add styling to the image */
export default function AppHeader() {
  const router = useRouter();
  return <View style={[styles.container]}>
    
    <Image
        source = {require("../assets/images/icon1.png")}
        style = {{
            height: 45,
            width: 45,
            marginRight: 60,
            marginTop: 40,
        }}
           
    />
    <Text style = {styles.text}>Candy Craze</Text>
    <TouchableHighlight onPress = {() => console.log("logged out")} style = {styles.icon}>
      <MaterialCommunityIcons name="logout" size={24} color={colors.light}/>
    </TouchableHighlight>
   
   
  </View>;
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  text: {
    color: colors.light,
    fontSize: 27,
    marginTop:40,
    fontFamily: "Georgia",
    marginRight: 50,
  },
  icon:{
    marginTop: 40,
  }
});