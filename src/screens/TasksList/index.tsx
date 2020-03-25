// react
import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, initialize } from "../../redux/user";
import { add, remove, getIncomplete, getList, start } from "../../redux/task";
import { selectTaskData, selectTasksList } from "../../redux/task/selectors";
// components
import Button from "../../components/Button";
import TaskSwipeableInfo from "./TaskSwipeableInfo";
import TaskInfo from "../../components/TaskInfo";
import WorkingTaskInfo from "../../components/WorkingTaskInfo";
import Title from "../../components/Title";
// hooks
import { useAuth } from "../../hooks/useAuth";
// constants
import { Routes } from "../../navigation/routes";
// date-fns
import { getUnixTime } from "date-fns";

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

  const onResumePress = el => {
    const startTime = getUnixTime(new Date());
    dispatch(start.request({ ...el, startTime }));
  };

  const { startTime, duration, title } = taskData;
  return (
    <View>
      <Title text="Tasks" buttonText="Log out" buttonAction={onLogOut} />
      {tasksList?.map(el => {
        const {
          title,
          project,
          duration,
          startTaskTime,
          isPaused,
          isCompleted,
          id,
          file
        } = el;

        if (taskData?.id === id) {
          const props = { title, project, startTaskTime };
          return <TaskInfo key={id} {...props} />;
        }
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
            onResumePress={() => onResumePress(el)}
          />
        );
      })}
      {startTime ? (
        <WorkingTaskInfo
          title={title}
          startTime={startTime}
          duration={duration}
          onCreateTask={onCreateTask}
        />
      ) : (
        <Button onPress={toAddTask}>Add task</Button>
      )}
    </View>
  );
};
