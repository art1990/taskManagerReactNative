// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import Button from "../Button";
// types
import { INavigationMessage } from "../../types";

const NavigationMessage: React.FC<INavigationMessage> = ({
  text,
  buttonText,
  goTo,
}) => (
  <View style={styles.container}>
    <Text style={styles.alreadyText}>{text}</Text>
    <Button mode="text" onPress={goTo}>
      {buttonText}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 44,
    flexDirection: "row",
    flex: 0,
    justifyContent: "center",
  },
  alreadyText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 20,
  },
});

export default NavigationMessage;
