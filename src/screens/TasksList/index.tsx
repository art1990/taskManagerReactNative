// react
import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, initialize } from "../../redux/user";
import { add, remove, getIncomplete, getList } from "../../redux/task";
import { selectTaskData, selectTasksList } from "../../redux/task/selectors";
// components
import Button from "../../components/Button";
import TaskSwipeableInfo from "./TaskSwipeableInfo";
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
    if (!user) return;
    user && dispatch(initialize.run(user));
    dispatch(getIncomplete.request());
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getList.request());
    }, [user])
  );

  const onLogOut = () => {
    dispatch(logout.run());
  };

  const onCreateTask = () => {
    dispatch(add.request(taskData));
  };

  const onRemovePress = (id, uri) => {
    dispatch(remove.request({ id, uri }));
  };

  const onEditPress = id => {
    navigation.navigate(Routes.EDIT_TASK, { id });
  };

  const toAddTask = () => {
    navigation.navigate(Routes.CREATE_TASK);
  };

  const { startTime, title } = taskData;
  return (
    <View>
      <Title text="Tasks" buttonText="Log out" buttonAction={onLogOut} />
      {tasksList?.map(
        ({ title, project, duration, isPaused, isCompleted, id, file }) => {
          const props = { title, project, duration, isPaused, isCompleted };

          return (
            <TaskSwipeableInfo
              key={id}
              {...props}
              onRemovePress={() => {
                onRemovePress(id, file?.uri);
              }}
              onEditPress={() => {
                onEditPress(id);
              }}
            />
          );
        }
      )}
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
