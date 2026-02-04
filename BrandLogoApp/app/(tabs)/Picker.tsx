import { useAuth } from "@/components/AuthProvider";
import Button from "@/components/Button";
import colors from "@/styles/colors";
import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyles from "../../styles/defaultStyles";
export default function Picker() {
  const candies = ["Swedish Fish", "Sour Patch", "Skittles", "Laffy Taffy", "Gummy Bears"];
  const chocolates = ["Kit Kat", "Twix", "Snickers", "Hershey's", "Milky Way"];

  const [candyCount, setCandyCount] = useState<number>(1);
  const [chocCount, setChocCount] = useState<number>(1);
  const [result, setResult] = useState("");
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  function addCandy() {
      setCandyCount(candyCount + 2);
      console.log(candyCount);
      setResult("");
  }
  function addChoc() {
      setChocCount(chocCount + 2);
      console.log(chocCount);
      setResult("");
  }
  function getCandy(){
    if(chocCount == 0 && candyCount ==0){
      console.log("hi");
      setResult("");
    }
    else if(candyCount>=chocCount){
      setCandyCount(0);
      setChocCount(0);
      setResult(candies[Math.floor(Math.random() * candies.length)]);
    }
    
    else{
      setCandyCount(0);
      setChocCount(0);
      setResult(chocolates[Math.floor(Math.random() * chocolates.length)]);
    }
    
  }
  //used chatGPT to condense the useEffect/updateProfile function to save new value to fav_candy in supabase
  //https://chatgpt.com/share/69839243-07d8-8013-92da-2779b316fe6b
  async function updateCandy() {
    console.log("in update function");
    if (!session?.user) {
      Alert.alert("You must be signed in.");
      return;
    }
    if (!result) {
      Alert.alert("Press GET CANDY first!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          fav_candy: result,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id);

      if (error) {
        Alert.alert("Save failed", error.message);
        return;
      }

      Alert.alert("Saved!", `${result} set as favorite.`);
    } catch (err) {
      Alert.alert("Unexpected error", String(err));
    } finally {
      setLoading(false);
    }
  }
   
    

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style = {[defaultStyles.titleText, {fontSize: 18}, {color: colors.dark}]}>Pick your preference to get a candy you might like!</Text>
      <View style = {defaultStyles.quizContainers}>
        <Button title = "Sweet" onPress = {addCandy}></Button>
        <Text style={[defaultStyles.titleText, {marginTop: 20}]}>OR</Text>
        <Button title = "Salty" onPress = {addChoc}></Button>
      </View>
      <View style = {defaultStyles.quizContainers}>
        <Button title = "Fruity" onPress = {addCandy}></Button>
        <Text style={[defaultStyles.titleText, {marginTop: 20}]}>OR</Text>
        <Button title = "Chocolatey"onPress = {addChoc} ></Button>
      </View>
      <View style = {defaultStyles.quizContainers}>
        <Button title = "Bright" onPress = {addCandy}></Button>
        <Text style={[defaultStyles.titleText, {marginTop: 20}]}>OR</Text>
        <Button title = "Fudgy" onPress = {addChoc}></Button>
      </View>
      <Button title = "GET CANDY!" onPress = {getCandy} color = {colors.dark} textColor = {colors.light} ></Button>
      <Text style={defaultStyles.titleText}>You might like: {result}</Text>
      <Button title = "Set as favorite" onPress = {updateCandy} color = {colors.dark} textColor = {colors.light} ></Button>
    </SafeAreaView>
  );
}

