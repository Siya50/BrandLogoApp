import { supabase } from '@/utils/supabase';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";
import { Alert, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import colors from "../app/styles/colors";
/**  Utilized ChatGPT to figure out how to add styling to the image */
export default function AppHeader() {
  const router = useRouter();
  
  // Simplified sign out: intentionally NOT performing any navigation here.
  // Rationale: navigation attempts from inside nested navigators (tabs)
  // were unreliable and caused unmatched route or no-op behavior. The
  // app now uses a global AuthProvider and the tabs layout renders the
  // Auth screen in-place when the session becomes null.
  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        Alert.alert("Logout failed", error.message);
      }
    } catch (err: any) {
      Alert.alert("Logout failed", err?.message ?? String(err));
    }
  }
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
    <TouchableHighlight onPress = {handleLogout} style = {styles.icon}>
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