// react
import React from "react";
import { StyleSheet, KeyboardTypeOptions, View, Alert } from "react-native";
import { TextInput } from "react-native-paper";
// components
import Input from "../Input";
// interface
import { IInputProps } from "../Input";
// icons
import { Feather } from "@expo/vector-icons";

interface IPasswordInputProps extends IInputProps {
  iconSize: number;
}

const PasswordInput: React.FC<IPasswordInputProps> = props => {
  const { iconSize, secureTextEntry } = props;

  const size = iconSize || 24;
  const name = `eye${secureTextEntry ? "" : "-off"}`;

  return (
    <View>
      <Input {...props} style={styles.input} />
      {secureTextEntry && (
        <Feather
          style={[styles.eyeContainer, { translateY: size / 2 }]}
          name={name}
          size={24}
          color="rgba(0, 0, 0, 0.16)"
        />
      )}
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
    right: -10
  }
});

export default PasswordInput;
