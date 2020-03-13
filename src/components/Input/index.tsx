// react
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardTypeOptions
} from "react-native";

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
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      autoCorrect={false}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    borderColor: "grey",
    borderBottomWidth: 2
  },
  label: {
    paddingBottom: 0,
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
    color: "#333",
    fontSize: 18,
    fontWeight: "700"
  }
});

export default Input;
