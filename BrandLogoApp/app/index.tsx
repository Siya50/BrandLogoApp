import Auth from "@/components/Auth";
import { View } from "react-native";
import defaultStyles from "./styles/defaultStyles";
export default function Index() {

  return (
    <View style = {defaultStyles.container}>
      <Auth/>
    </View>
  
  );
}