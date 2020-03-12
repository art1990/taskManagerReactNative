// react
import React, { useState } from "react";
// components
import { View, Text } from "react-native";
import Input from "../../components/Input";

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [project, setProject] = useState<string>("");

  return (
    <View>
      <Text>New Task</Text>
      <Input value={title} onChangeText={text => setTitle(text)} />
      <Input value={project} onChangeText={text => setProject(text)} />
    </View>
  );
};

export default CreateTask;
