// react
import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, initialize } from "../../redux/user";
import { add, getIncomplete, getList } from "../../redux/task";
import { selectTaskData, selectTasksList } from "../../redux/task/selectors";
// components
import Button from "../../components/Button";
import TaskInfo from "../../components/TaskInfo";
import WorkingTaskInfo from "../../components/WorkingTaskInfo";
import Title from "../../components/Title";

// hooks
import { useAuth } from "../../hooks/useAuth";
// constants
import { Routes } from "../../navigation/routes";

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
    navigation.navigate(Routes.CREATE_TASK);
  };

  const { startTime, title } = taskData;
  return (
    <View>
      <Title text="Tasks" buttonText="Log out" buttonAction={onLogOut} />
      {tasksList?.map(({ title, duration, id }) => (
        <TaskInfo key={id} title={title} duration={duration} />
      ))}
      {startTime ? (
        <WorkingTaskInfo
          title={title}
          startTime={startTime}
          onCreateTask={onCreateTask}
        />
      ) : (
        <Button onPress={toAddTask}>Add task</Button>
      )}
    </View>
  );
};
