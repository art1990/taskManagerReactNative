// react
import React from "react";
import { View, ScrollView } from "react-native";
// components
import Title from "../../components/Title";
import TaskForm from "../../components/forms/TaskForm";
// hooks
import useUpdateTask from "../../hooks/task/useUpdateTask";
import useRemoveTask from "../../hooks/task/useRemoveTask";
// sections
import Time from "../sections/Time";
// styles
import styles from "../../assets/styles";

const EditTask: React.FC = () => {
  const { onUpdateTask, formData, timeProps } = useUpdateTask();
  const { onRemovePress } = useRemoveTask();

  return (
    <View style={styles.wrapper}>
      <Title
        text="Edit task"
        buttonText="Delete task"
        buttonAction={() => onRemovePress(undefined, true)}
      />
      <ScrollView>
        <TaskForm isEditing formData={formData} onSubmit={onUpdateTask}>
          <Time {...timeProps} />
        </TaskForm>
      </ScrollView>
    </View>
  );
};

export default EditTask;
