// react
import React from "react";
import { StyleSheet } from "react-native";
// react-paper
import { Button } from "react-native-paper";
// contsnts
import { Colors } from "../../assets/styles/constants";

interface IButtonProps {
  onPress: () => void;
  children: string;
  color?: string;
  labelStyle?: {};
  style?: {};
  mode?: any;
}

const CustomButton: React.FC<IButtonProps> = ({
  onPress,
  children,
  mode,
  color,
  labelStyle,
  style,
  ...rest
}) => {
  const isText = mode === "text";

  const textStyle = [styles.text, isText && styles.modeText, labelStyle];

  const containerStyle = [isText && styles.container, style];

  return (
    <Button
      mode={mode || "contained"}
      color={Colors.button}
      onPress={onPress}
      labelStyle={textStyle}
      style={containerStyle}
      uppercase={false}
      {...rest}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  text: {
    marginVertical: 22,
    marginHorizontal: 0,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 20,
    color: Colors.white,
  },
  modeText: {
    marginVertical: 0,
    marginHorizontal: 0,
    color: Colors.black,
  },
});

export default CustomButton;
