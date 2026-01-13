import React from "react";
import { TextInput, View } from "react-native";

import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";
/*
This component is similar to the TextInput but allows
the user to pass in a state var and its update function
*/

type propsType = {
  placeholder: string;
  borderColor?: string;
  value: string; // The current value of the TextField
  onChangeText: (newValue: string) => void; // The function to update the value
};
// used chatGPT to implement show/hide feature on textfield
//https://chatgpt.com/share/6965428d-6078-8013-91ef-32b21330267c
const TextField: React.FC<propsType> = ({
  placeholder,
  borderColor = colors.primary,
  value,
  onChangeText,
}) => {
  return (
    <View>
      <TextInput
        style={[defaultStyles.textfield, { borderColor: borderColor }]}
        placeholder={placeholder}
        placeholderTextColor={colors.dark}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextField;
