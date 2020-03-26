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
  color?: string;
  labelStyle?: {};
  style?: {};
  mode?: any;
}

const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  children,
  mode,
  color,
  labelStyle,
  style,
  ...rest
}) => {
  const textStyle = [
    styles.text,
    mode === "text" && styles.modeText,
    labelStyle
  ];

  return (
    <Button
      mode={mode || "contained"}
      color={Colors.button}
      onPress={onPress}
      labelStyle={textStyle}
      style={style}
      uppercase={false}
      {...rest}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 22,
    marginHorizontal: 0,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 20,
    color: Colors.white
  },
  modeText: {
    marginVertical: 0,
    marginHorizontal: 0,
    color: Colors.black
  }
});

export default CustomButton;
