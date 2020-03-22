// react
import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ITitle {
  text: string;
}

const Title: React.FC<ITitle> = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0
  },
  text: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 28
  }
});

export default Title;
