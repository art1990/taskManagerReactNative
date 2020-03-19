// react
import React from "react";
import { StyleSheet, KeyboardTypeOptions, View, Image } from "react-native";
import { TextInput } from "react-native-paper";
// assets

export interface InputProps {
  style?: {};
  name: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

const Input: React.FC<InputProps> = ({
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
      {secureTextEntry && (
        <Image
          source={require("../../assets/img/eye.svg")}
          style={{ width: 50, height: 50 }}
        />
      )}
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
