// react
import React, { useCallback, useEffect } from "react";
import { View, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, initialize } from "../../redux/user";
import {
  add,
  remove,
  pause,
  resume,
  getIncomplete,
  getList,
  start
} from "../../redux/task";
import {
  selectTaskData,
  selectTasksList,
  selectMeta
} from "../../redux/task/selectors";
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

export default ({ navigation }) => {
  const { user } = useAuth();
  const taskData = useSelector(selectTaskData);
  const tasksList = useSelector(selectTasksList);
  const { isLoading, isLoadingIncomplete } = useSelector(selectMeta);

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

  const onPausePress = () => {
    dispatch(pause.request(taskData));
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

  const onResumePress = task => {
    dispatch(resume.request(task));
  };

  const toView = task => {
    navigation.navigate(Routes.VIEW_TASK);
  };
  const { startTime, duration, title } = taskData;
  return (
    <View>
      <Title text="Tasks" buttonText="Log out" buttonAction={onLogOut} />
      {!isLoading && !isLoadingIncomplete && (
        <>
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
              const props = { title, project, startTaskTime, isPaused };
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
                toView={() => toView(el)}
              />
            );
          })}
          {startTime ? (
            <WorkingTaskInfo
              title={title}
              startTime={startTime}
              duration={duration}
              onCreateTask={onPausePress}
            />
          ) : (
            <Button onPress={toAddTask}>Add task</Button>
          )}
        </>
      )}
    </View>
  );
};
