// react
import React, { useState } from "react";
import { View, Text } from "react-native";
// redux
import { start } from "../../domains/task";
import { useDispatch } from "react-redux";
// components
import Input from "../../components/Input";
import Button from "../../components/Button";
import FileUploaderInput from "../../components/FileUploaderInput";
// date-fns
import { getUnixTime } from "date-fns";
// constants
import { TASKS_LIST } from "../../navigation/routesConstants";

const CreateTask: React.FC = ({ navigation }) => {
  const [title, setTitle] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [file, setFile] = useState<object>(null);

  const dispatch = useDispatch();

  const onStartTask = () => {
    dispatch(
      start.request({
        title,
        project,
        startTime: getUnixTime(new Date()),
        file
      })
    );
    navigation.navigate(TASKS_LIST);
  };

  return (
    <View>
      <Text>New Task</Text>
      <Input value={title} onChangeText={text => setTitle(text)} />
      <Input value={project} onChangeText={text => setProject(text)} />
      <FileUploaderInput setFile={setFile} />
      <Button onPress={onStartTask}>Start task</Button>
    </View>
  );
};

export default CreateTask;
