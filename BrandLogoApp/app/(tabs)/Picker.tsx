import Button from "@/components/Button";
import colors from "@/styles/colors";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyles from "../../styles/defaultStyles";
export default function Picker() {
  const candies = ["Swedish Fish", "Sour Patch", "Skittles", "Laffy Taffy", "Gummy Bears"];
  const chocolates = ["Kit Kat", "Twix", "Snickers", "Hershey's", "Milky Way"];
  const randomCandy = candies[Math.floor(Math.random() * candies.length)];
  const randomChocolate= chocolates[Math.floor(Math.random() * candies.length)];
  const [candyCount, setCandyCount] = useState<number>(1);
  const [chocCount, setChocCount] = useState<number>(1);
  const [result, setResult] = useState("");
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
    if(candyCount>=chocCount){
      setCandyCount(0);
      setChocCount(0);
      console.log(randomCandy);
      setResult(randomCandy);
    }
    else{
      setCandyCount(0);
      setChocCount(0);
      console.log(randomChocolate);
      setResult(randomChocolate);
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
      <Button title = "Set as favorite" onPress = {getCandy} color = {colors.dark} textColor = {colors.light} ></Button>
    </SafeAreaView>
  );
}
