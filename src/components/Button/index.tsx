// react
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPress: () => void;
  children: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export default Button;
