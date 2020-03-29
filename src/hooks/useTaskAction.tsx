// react
import React, { useState, useEffect, useCallback } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectTaskData, selectCurrentTaskData } from "../redux/task/selectors";
import { pause, resume, remove, update } from "../redux/task";
// react-navigation
import { useRoute, useNavigation } from "@react-navigation/native";
// constants
import { Routes } from "../navigation/routes";

const useTaskAction = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const task: any = id && useSelector(selectCurrentTaskData(id));
  const dispatch = useDispatch();

  const taskData = useSelector(selectTaskData);

  const onPausePress = () => {
    dispatch(pause.request(taskData));
  };

  const onRemovePress: (_id?: string, uri?: string) => void = (_id, uri) => {
    dispatch(remove.request({ id: id || _id, uri }));
  };

  const onEditPress: (_id?: string) => void = _id => {
    navigation.navigate(Routes.EDIT_TASK, { id: id || _id });
  };

  const toAddTags: () => void = () => {
    navigation.navigate(Routes.ADD_TAGS);
  };

  const onResumePress = taskData => {
    const data = { ...(task || taskData), navigation };
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
    task
  };
};

export default useTaskAction;
