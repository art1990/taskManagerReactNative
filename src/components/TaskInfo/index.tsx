// react
import React from "react";
import { View, Text } from "react-native";
// utils
import { formatToUTCTime } from "../../utils/date";

const TaskInfo = ({ title, duration }) => (
  <View>
    <Text>{title}</Text>
    <Text> {formatToUTCTime(duration)}</Text>
  </View>
);

export default TaskInfo;
