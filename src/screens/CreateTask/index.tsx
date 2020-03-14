// react
import React, { useState } from "react";
import { View, Text } from "react-native";
// redux
import { start } from "../../domains/task";
import { useDispatch } from "react-redux";
// components
import Input from "../../components/Input";
import Button from "../../components/Button";
// date-fns
import { getUnixTime } from "date-fns";
// constants
import { TASKS_LIST } from "../../navigation/routesConstants";

const CreateTask: React.FC = ({ navigation }) => {
  const [title, setTitle] = useState<string>("");
  const [project, setProject] = useState<string>("");

  const dispatch = useDispatch();

  const onStartTask = () => {
    dispatch(
      start.request({ title, project, startTime: getUnixTime(new Date()) })
    );
    navigation.navigate(TASKS_LIST);
  };

  return (
    <View>
      <Text>New Task</Text>
      <Input value={title} onChangeText={text => setTitle(text)} />
      <Input value={project} onChangeText={text => setProject(text)} />
      <Button onPress={onStartTask}>Start task</Button>
    </View>
  );
};

export default CreateTask;
