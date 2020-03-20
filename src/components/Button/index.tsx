// react
import React from "react";
import { StyleSheet } from "react-native";
// react-paper
import { Button } from "react-native-paper";
// contsnts
import { Colors } from "../../assets/styles/constants";

interface ButtonProps {
  onPress: () => void;
  children: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  children,
  ...rest
}) => (
  <Button
    mode="contained"
    color={Colors.button}
    onPress={onPress}
    contentStyle={styles.buttonContainer}
    labelStyle={styles.textContainer}
    {...rest}
  >
    {children}
  </Button>
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60
  },
  textContainer: {
    color: Colors.white
  }
});

export default CustomButton;
