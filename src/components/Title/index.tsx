// react
import React from "react";
import { Text, View, StyleSheet } from "react-native";
// components
import Button from "../Button";
// constants
import { Colors } from "../../assets/styles/constants";

interface ITitle {
  text: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const Title: React.FC<ITitle> = ({ text, buttonText, buttonAction }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
    {buttonText && (
      <Button mode="text" labelStyle={styles.button} onPress={buttonAction}>
        {buttonText}
      </Button>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between"
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
  }
});

export default Title;
