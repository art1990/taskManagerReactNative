// react
import React, { useState } from "react";
import { StyleSheet, KeyboardTypeOptions, View, Alert } from "react-native";
import { TextInput } from "react-native-paper";
// components
import Input from "../Input";
// interface
import { IInputProps } from "../Input";
// icons
import { Feather } from "@expo/vector-icons";
// constants
import { Colors } from "../../assets/styles/constants";

interface IPasswordInputProps extends IInputProps {
  iconSize?: number;
  isError?: boolean;
}

const PasswordInput: React.FC<IPasswordInputProps> = props => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const { iconSize, isError } = props;

  const changeSecureTextEntry = () => setSecureTextEntry(!secureTextEntry);

  const size = iconSize || 20;
  const name = `eye${secureTextEntry ? "" : "-off"}`;
  const color = isError ? Colors.error : "rgba(0, 0, 0, 0.16)";

  return (
    <View>
      <Input
        {...props}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
      <Feather
        style={[
          styles.eyeContainer,
          { transform: [{ translateY: -size / 2 }] }
        ]}
        name={name}
        size={size}
        color={color}
        onPress={changeSecureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    position: "relative"
  },
  eyeContainer: {
    position: "absolute",
    top: "50%",
    right: 15
  }
});

export default PasswordInput;
