// react
import React, { useCallback, useEffect } from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, initialize } from "../../redux/user";
import { getIncomplete, getList } from "../../redux/task";
import {
  selectTaskData,
  selectTasksList,
  selectMeta,
} from "../../redux/task/selectors";
// components
import Button from "../../components/Button";
import TaskSwipeableInfo from "./TaskSwipeableInfo";
import TaskInfo from "../../components/TaskInfo";
import WorkingTaskInfo from "../../components/WorkingTaskInfo";
import TitleWithFilter from "../sections/TitleWithFilter";
import GenerateListOfTask from "./GenerateListOfTask";
// hooks
import { useAuth } from "../../hooks/useAuth";
import useTaskAction from "../../hooks/useTaskAction";
// routes
import { Routes } from "../../navigation/routes";
// styles
import Styles from "../../assets/styles";
import { Colors } from "../../assets/styles/constants";
// types
import { ITaskState } from "../../redux/task";

export default ({ navigation }) => {
  const { user } = useAuth();
  const taskData = useSelector(selectTaskData);
  const tasksList = useSelector(selectTasksList);
  const { isLoading, isLoadingIncomplete, filters } = useSelector(selectMeta);
  const {
    onEditPress,
    onResumePress,
    onRemovePress,
    onPausePress,
    toFilters,
  } = useTaskAction();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    user && dispatch(initialize.run(user));
    dispatch(getIncomplete.request());
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getList.request(filters));
    }, [user, filters])
  );

  const onLogOut = () => {
    dispatch(logout.run());
  };

  const toAddTask = () => {
    navigation.navigate(Routes.CREATE_TASK);
  };

  const toView = ({ id }) => {
    navigation.navigate(Routes.VIEW_TASK, { id });
  };

  const { startTime, duration, title } = taskData;
  return (
    <View
      style={[
        Styles.wrapper,
        styles.container,
        !tasksList && Styles.columnSpaceBetween,
      ]}
    >
      <TitleWithFilter
        text="Tasks"
        buttonText="Log out"
        buttonAction={onLogOut}
        onPressFilter={toFilters}
        isHasTag={!!filters}
      />
      {!isLoading &&
        !isLoadingIncomplete &&
        (tasksList ? (
          <>
            <FlatList
              style={Styles.fullScreen}
              data={tasksList}
              renderItem={(el: { item: ITaskState["taskData"] }) => {
                const {
                  title,
                  project,
                  duration,
                  startTaskTime,
                  isPaused,
                  isCompleted,
                  id,
                  file,
                } = el.item;

                if (taskData?.id === el.item.id) {
                  const props = {
                    title,
                    project,
                    startTaskTime,
                    isPaused,
                    style: { backgroundColor: Colors.taskInfoBGColorActive },
                  };
                  return <TaskInfo {...props} />;
                }

                const props = {
                  title,
                  project,
                  duration,
                  isPaused,
                  isCompleted,
                };

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
                    onResumePress={() => onResumePress(el.item)}
                    toView={() => toView(el.item)}
                  />
                );
              }}
            />

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
        ) : (
          <>
            <GenerateListOfTask />
            <Button onPress={toAddTask}>Add task</Button>
          </>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
