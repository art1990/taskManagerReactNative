// react
import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectTaskData, selectCurrentTaskData } from "../redux/task/selectors";
import { pause, resume, remove, update } from "../redux/task";
// react-navigation
import { useRoute, useNavigation } from "@react-navigation/native";
// constants
import { Routes } from "../navigation/routes";

interface ITaskAction {
  onEditPress: (_id?: string) => void;
  onPausePress: () => void;
  onRemovePress: (_id?: string, uri?: string) => void;
  onResumePress: (task: {}) => void;
  onMarkAsCompletedPress: () => void;
  toAddTags: () => void;
  toFilters: () => void;
  task: {};
}

const useTaskAction = (): ITaskAction => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const task: {} = id && useSelector(selectCurrentTaskData(id));
  const dispatch = useDispatch();

  const taskData = useSelector(selectTaskData);

  const onPausePress = () => {
    dispatch(pause.request(taskData));
  };

  const onRemovePress: (_id?: string, uri?: string) => void = (_id, uri) => {
    Alert.alert("Remove task", "Do you want to remove tasks??", [
      { text: "Cansel", style: "cancel" },
      {
        text: "Remove",
        onPress: () => dispatch(remove.request({ id: id || _id, uri })),
      },
    ]);
  };

  const onEditPress = (_id?: string): void => {
    navigation.navigate(Routes.EDIT_TASK, { id: id || _id });
  };

  const toAddTags = (): void => {
    navigation.navigate(Routes.ADD_TAGS);
  };

  const toFilters = (): void => {
    navigation.navigate(Routes.FILTERS);
  };

  const onResumePress = (userData) => {
    if (!taskData.isPaused) return Alert.alert("Paused active task!!");

    const data = { ...(task || userData || taskData), navigation };
    dispatch(resume.request(data));
  };

  const onMarkAsCompletedPress = () => {
    dispatch(update.request({ id, isCompleted: true, navigation }));
  };

  return {
    onEditPress,
    onPausePress,
    onRemovePress,
    onResumePress,
    onMarkAsCompletedPress,
    toAddTags,
    toFilters,
    task,
  };
};

export default useTaskAction;
