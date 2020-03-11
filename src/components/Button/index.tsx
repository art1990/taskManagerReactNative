// react
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent
} from "react-native";

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export default Button;
