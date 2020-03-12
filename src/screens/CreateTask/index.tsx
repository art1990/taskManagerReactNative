// react
import React, { useState } from "react";
// components
import { View, Text } from "react-native";
import Input from "../../components/Input";

interface CreateTaskProps {}

const CreateTask: React.FC<CreateTaskProps> = () => {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");

  return (
    <View>
      <Text>New Task</Text>
      <Input value={title} onChangeText={text => setTitle(text)} />
      <Input value={project} onChangeText={text => setProject(text)} />
    </View>
  );
};

export default CreateTask;
