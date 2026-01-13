import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import colors from "../app/styles/colors";
import defaultStyles from "../app/styles/defaultStyles";
/*
This component is similar to the TextInput but allows
the user to pass in a state var and its update function
*/

type propsType = {
  placeholder: string;
  borderColor?: string;
  value: string; // The current value of the TextField
  onChangeText: (newValue: string) => void; // The function to update the value
  show?: boolean;
};
// used chatGPT to implement show/hide feature on textfield 01/13
//https://chatgpt.com/share/6965428d-6078-8013-91ef-32b21330267c
const TextField: React.FC<propsType> = ({
  placeholder,
  borderColor = colors.primary,
  value,
  show = false,
  onChangeText,
}) => {
  const [isHidden, setIsHidden] = useState(show);
  return (
    <View>
      <TextInput
        style={[defaultStyles.textfield, { borderColor: borderColor }]}
        placeholder={placeholder}
        placeholderTextColor={colors.dark}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry = {isHidden}
      />
       {show && (
        <Pressable
          onPress={() => setIsHidden(!isHidden)}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: [{ translateY: -12 }],
          }}
        >
          <Ionicons
            name={isHidden ? "eye-off" : "eye"}
            size={24}
            color={colors.dark}
          />
        </Pressable>
      )}
    </View>
  );
};

export default TextField;
