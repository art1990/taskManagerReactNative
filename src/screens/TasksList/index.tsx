// react
import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, initialize } from "../../domains/user";
import { add, getIncomplete, getList } from "../../domains/task";
import { selectTaskData, selectTasksList } from "../../domains/task/selectors";
// components
import Button from "../../components/Button";
import Timer from "../../components/Timer";
import TaskInfo from "../../components/TaskInfo";

// hooks
import { useAuth } from "../../hooks/useAuth";
// constants
import { CREATE_TASK } from "../../navigation/routesConstants";

export default ({ navigation }) => {
  const { user } = useAuth();
  const taskData = useSelector(selectTaskData) || {};
  const tasksList = useSelector(selectTasksList);

  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(initialize.run(user));
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      dispatch(getIncomplete.request());
      dispatch(getList.request());
    }, [user])
  );

  const onLogOut = () => {
    dispatch(logout.run());
  };

  const onCreateTask = () => {
    dispatch(add.request(taskData));
  };

  const toAddTask = () => {
    navigation.navigate(CREATE_TASK);
  };

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
      {tasksList?.map(({ title, duration, id }) => (
        <TaskInfo key={id} title={title} duration={duration} />
      ))}
    </View>
  );
};
