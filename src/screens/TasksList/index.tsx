// react
import React, { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../domains/user";
import { add, getIncomplete } from "../../domains/task";
import { selectTaskData, selectTasksList } from "../../domains/task/selectors";
import { selectUser } from "../../domains/user/selectors";
// components
import Button from "../../components/Button";
import Timer from "../../components/Timer";
import TaskInfo from "../../components/TaskInfo";

// hooks
import { useAuth } from "../../hooks/useAuth";
// constants
import { CREATE_TASK } from "../../navigation/routesConstants";
// db
import { db } from "../../db";

export default ({ navigation }) => {
  const { user } = useAuth();
  const taskData = useSelector(selectTaskData);
  const tasksList = useSelector(selectTasksList);

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logout.run());
  };

  const onCreateTask = () => {
    dispatch(add.request(taskData));
  };

  const toAddTask = () => {
    navigation.navigate(CREATE_TASK);
  };

  useEffect(() => {
    dispatch(getIncomplete.request({ user }));
  }, [user]);

  const { startTime, title } = taskData;
  return (
    <View>
      <Text>Task List</Text>
      {user && <Button onPress={onLogOut}>LogOut</Button>}
      {startTime && (
        <View style={{ flexDirection: "row" }}>
          <Text>{title} </Text>
          <Timer startTime={startTime} />
        </View>
      )}
      <Button onPress={toAddTask}>Add task</Button>
      <Button onPress={onCreateTask}>Create Task</Button>
      {tasksList?.map(({ title, duration }) => (
        <TaskInfo title={title} duration={duration} />
      ))}
    </View>
  );
};
