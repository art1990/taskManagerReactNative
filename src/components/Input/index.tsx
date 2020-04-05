// react
import React from "react";
import { StyleSheet, KeyboardTypeOptions, View, Alert } from "react-native";
import { TextInput } from "react-native-paper";
// types
import { IInputProps } from "../../types";

const Input: React.FC<IInputProps> = (
  {
    style,
    label,
    value,
    onChangeText,
    placeholder,
    placeholderColor,
    secureTextEntry,
    keyboardType,
    name,
    ...rest
  },
  ref
) => {
  return (
    <TextInput
      {...rest}
      ref={ref}
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
        colors: {
          primary: "#979797",
          placeholder: placeholderColor || "rgba(0, 0, 0, 0.16)",
          disabled: placeholderColor || "rgba(0, 0, 0, 0.16)",
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    color: "#333",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default React.forwardRef(Input);
