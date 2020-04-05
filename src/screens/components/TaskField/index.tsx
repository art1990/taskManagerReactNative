// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// utils
import { formatToUTCTime } from "../../../utils/date";
// constanst
import { Colors } from "../../../assets/styles/constants";
// types
import { ITaskFieldProps } from "../../../types";

const TaskField: React.FC<ITaskFieldProps> = ({ title, text, isTime }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{isTime ? formatToUTCTime(text) : text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 15,
  },
  title: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.placeholder,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
  },
});

export default TaskField;
