import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TextField from "./components/TextField";
import defaultStyles from "./styles/defaultStyles";
export default function Index() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const goToHome = () => {
    router.push("../(tabs)/Browse");
  };



  return (
    
    <View
      style={defaultStyles.container}
    >
      <Text style={defaultStyles.titleText}>
        Candy Craze
      </Text>
      <TextField placeholder="Enter username" value={username} onChangeText={setUsername} ></TextField>
      <TextField placeholder="Enter password" value={password} onChangeText={setPassword} ></TextField>
      <TouchableOpacity
        onPress={goToHome}
        style={defaultStyles.buttonContainer}
      >
        <Text style={defaultStyles.buttonText}>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goToHome}
        style={defaultStyles.buttonContainer}
      >
        <Text style={defaultStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}