// react
import React from "react";
import { View, Text } from "react-native";

interface ITaskView {}

const ViewTask: React.FC<ITaskView> = () => {
  return (
    <View>
      <Text>View Task</Text>
    </View>
  );
};

export default ViewTask;
