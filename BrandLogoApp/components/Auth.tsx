import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, AppState, AppStateStatus, Text, TouchableOpacity, View } from "react-native";
import defaultStyles from "../app/styles/defaultStyles";
import TextField from "../components/TextField";
import { supabase } from "../utils/supabase";
export default function Auth() {
  const [email, setEmail] = useState<string>("@gmail.com");
  const [password, setPassword] = useState<string>("Siya123");
  const router = useRouter();
    //Used ChatGPT to learn how to check for a number in a string
    // 1/22/26
    // https://chatgpt.com/share/69726e7d-5108-8013-ae16-6edff366d4c1
  const goToHome = () => {
    if(email != "" && password != "" && password.length>=6 && /\d/.test(password)){
        setEmail(email);
        console.log(email, password);
        signInWithEmail();
    }   
    else{
        Alert.alert("You need a username and a password with 6 characters and a number");
    }
  };
    useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        try {
          supabase.auth.stopAutoRefresh();
        } catch {}
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    if (AppState.currentState === "active") {
      supabase.auth.startAutoRefresh();
    }

    return () => {
      if (typeof subscription?.remove === "function") {
        subscription.remove();
      }
      try {
        supabase.auth.stopAutoRefresh();
      } catch {}
    };
  }, []);

    async function signInWithEmail() {
      if(email != "" && password != "" && password.length>=6 && /\d/.test(password)){
        setEmail(email);
        console.log(email, password);
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          Alert.alert(error.message);
        }
      }
      else{
        Alert.alert("You need a username and a password with 6 characters and a number");
      }
  }

  async function signUpWithEmail() {
    if(email != "" && password != "" && password.length>=6 && /\d/.test(password)){
      setEmail(email);
      console.log(email, password);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
    
      if (error) {
        Alert.alert(error.message);
      }
    }
    else{
        Alert.alert("You need a username and a password with 6 characters and a number");
    }
  }

  
  return (
    
    <View
      style={defaultStyles.container}
    >
      <Text style={defaultStyles.titleText}>
        Candy Craze
      </Text>
      <TextField placeholder="Enter email" value={email} onChangeText={setEmail} ></TextField>
      <TextField placeholder="Enter password" value={password} onChangeText={setPassword} show ></TextField>
      <TouchableOpacity
        onPress={signUpWithEmail}
        style={defaultStyles.buttonContainer}
      >
        <Text style={defaultStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signInWithEmail}
        style={defaultStyles.buttonContainer}
      >
        <Text style={defaultStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}