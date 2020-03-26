// react
import React from "react";
import { Text, View, StyleSheet } from "react-native";
// components
import Button from "../Button";
// constants
import { Colors } from "../../assets/styles/constants";
// assets
import Complete from "../../assets/img/icons/complete.svg";

interface ITitle {
  text: string;
  buttonText?: string;
  buttonAction?: () => void;
  iconButtonList?: JSX.Element[];
  isCompleted?: boolean;
}

const Title: React.FC<ITitle> = ({
  text,
  buttonText,
  buttonAction,
  iconButtonList,
  isCompleted
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
    {buttonText && (
      <Button mode="text" labelStyle={styles.button} onPress={buttonAction}>
        {buttonText}
      </Button>
    )}
    {(iconButtonList || isCompleted) && (
      <View style={styles.iconButtonContainer}>
        {isCompleted ? <Complete width={20} height={20} /> : iconButtonList}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 28
  },
  button: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.error
  },
  iconButtonContainer: {
    flex: 0,
    flexDirection: "row"
  }
});

export default Title;
