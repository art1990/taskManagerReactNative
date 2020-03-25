// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ITaskField {
  title: string;
  text: string;
}

const TaskField: React.FC<ITaskField> = ({ title, text }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "column"
  },
  title: {},
  text: {}
});

export default TaskField;
