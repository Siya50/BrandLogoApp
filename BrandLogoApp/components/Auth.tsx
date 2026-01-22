import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import defaultStyles from "../app/styles/defaultStyles";
import TextField from "../components/TextField";
export default function Auth() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
    //Used ChatGPT to learn how to check for a number in a string
    // 1/22/26
    // https://chatgpt.com/share/69726e7d-5108-8013-ae16-6edff366d4c1
  const goToHome = () => {
    if(username != "" && password != "" && password.length>=6 && /\d/.test(password)){
        setUsername(username);
        console.log(username, password);
        router.push("../(tabs)/Browse");
    }   
    else{
        Alert.alert("You need a username and a password with 6 characters and a number");
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