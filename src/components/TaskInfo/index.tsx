// react
import React from "react";
import { View, Text } from "react-native";

const TaskInfo = ({ title, duration }) => (
  <View>
    <Text>{title}</Text>
    <Text> {duration}</Text>
  </View>
);

export default TaskInfo;
