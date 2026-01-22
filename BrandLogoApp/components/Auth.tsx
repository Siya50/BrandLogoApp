import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import defaultStyles from "../app/styles/defaultStyles";
import TextField from "../components/TextField";
export default function Auth() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const goToHome = () => {
    if(username != "" && password != "" && password.length>=6){
        setUsername(username);
        console.log(username, password);
        router.push("../(tabs)/Browse");
    }   
  };

  return (
    
    <View
      style={defaultStyles.container}
    >
      <Text style={defaultStyles.titleText}>
        Candy Craze
      </Text>
      <TextField placeholder="Enter username" value={username} onChangeText={setUsername} ></TextField>
      <TextField placeholder="Enter password" value={password} onChangeText={setPassword} show ></TextField>
      <TouchableOpacity
        onPress={goToHome}
        style={defaultStyles.buttonContainer}
      >
        <Text style={defaultStyles.buttonText}>Sign Up</Text>
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