// react
import React from "react";
import { StyleSheet, KeyboardTypeOptions } from "react-native";
import { TextInput } from "react-native-paper";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType
}) => (
  <TextInput
    style={styles.input}
    label={label}
    autoCorrect={false}
    onChangeText={onChangeText}
    placeholder={placeholder}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
    value={value}
  />
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    borderColor: "grey",
    borderWidth: 2
  },
  label: {
    color: "#333",
    fontSize: 17,
    fontWeight: "700",
    width: "100%"
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    width: "100%",
    height: 50,
    color: "#333",
    fontSize: 18,
    fontWeight: "700",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.16);",
    borderRadius: 3
  }
});

export default Input;
