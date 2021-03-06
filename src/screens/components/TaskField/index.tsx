// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// utils
import { formatToUTCTime } from "../../../utils/date";
// constanst
import { Colors } from "../../../assets/styles/constants";

interface ITaskFieldProps {
  title: string;
  text?: string | number;
  isTime?: boolean;
  hasMounth?: boolean;
}

const TaskField: React.FC<ITaskFieldProps> = ({
  title,
  text,
  isTime,
  hasMounth,
  children,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {children ? (
      children
    ) : (
      <Text style={styles.text}>
        {isTime ? formatToUTCTime(text, hasMounth) : text}
      </Text>
    )}
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
