// react
import React from "react";
import { StyleSheet, KeyboardTypeOptions, View, Alert } from "react-native";
import { TextInput } from "react-native-paper";
// icons

export interface IInputProps {
  style?: {};
  name: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

const Input: React.FC<IInputProps> = ({
  style,
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  name,
  ...rest
}) => {
  return (
    <View>
      <TextInput
        {...rest}
        mode="outlined"
        style={[styles.input, style]}
        label={label}
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        theme={{
          colors: { primary: "#979797", placeholder: "rgba(0, 0, 0, 0.16)" }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    width: "100%",
    height: 50,
    color: "#333",
    fontSize: 18,
    fontWeight: "700"

    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "rgba(0, 0, 0, 0.16);",
    // borderRadius: 3
  }
});

export default Input;
