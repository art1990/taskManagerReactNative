// react
import React, { useCallback, useEffect } from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, initialize } from "../../redux/user";
import { getIncomplete, getList, getMoreList } from "../../redux/task";
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
import Spinner from "../../components/Spinner";
// hooks
import { useAuth } from "../../hooks/useAuth";
import useTaskAction from "../../hooks/useTaskAction";
import useIsMounted from "../../hooks/useIsMounted";
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
  const {
    isLoading,
    isLoadingIncomplete,
    filters,
    lastVisible,
    isLoadingTaskList,
    limit,
    tasksCount,
  } = useSelector(selectMeta);
  const {
    onEditPress,
    onResumePress,
    onRemovePress,
    onPausePress,
    toFilters,
  } = useTaskAction();
  const isMounted = useIsMounted();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    user && dispatch(initialize.run(user));
    dispatch(getIncomplete.request());
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getList.request({ filters, limit }));
    }, [user, filters])
  );

  const onLogOut = useCallback(() => {
    dispatch(logout.run());
  }, [dispatch, logout]);

  const toAddTask = useCallback(() => {
    navigation.navigate(Routes.CREATE_TASK);
  }, [navigation]);

  const toView = useCallback(
    ({ id }) => {
      navigation.navigate(Routes.VIEW_TASK, { id });
    },
    [navigation]
  );

  const loadMore = useCallback(() => {
    tasksList.length < tasksCount &&
      dispatch(getMoreList.request({ filters, lastVisible, limit }));
  }, [
    tasksList,
    tasksCount,
    dispatch,
    getMoreList,
    filters,
    lastVisible,
    limit,
  ]);

  const renderFooter = () => {
    if (!isLoadingTaskList) return null;

    return <Spinner />;
  };

  const isLoader = isLoading || isLoadingIncomplete || !isMounted;
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
      {isLoader ? (
        <Spinner />
      ) : tasksList ? (
        <>
          <FlatList
            style={Styles.fullScreen}
            data={tasksList}
            keyExtractor={(item) => item.id}
            onEndReached={loadMore}
            onEndReachedThreshold={0.001}
            ListFooterComponent={renderFooter}
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

              if (taskData?.id === id) {
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
