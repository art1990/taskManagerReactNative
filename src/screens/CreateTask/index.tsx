// react
import React, { useState } from "react";
import { View, Text } from "react-native";
// redux
import { start } from "../../domains/task";
import { useDispatch } from "react-redux";
// components
import Input from "../../components/Input";
import Button from "../../components/Button";

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [project, setProject] = useState<string>("");

  const dispatch = useDispatch();

  const onStartTask = () => {
    dispatch(start.run({ title, project, statTime: new Date() }));
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
