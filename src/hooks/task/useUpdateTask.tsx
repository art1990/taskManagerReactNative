// react
import React, { useCallback } from "react";
import { Alert } from "react-native";
// redux
import { useSelector } from "react-redux";
import { update, resume, pause } from "../../redux/task";
import {
  selectTaskFormData,
  selectCurrentTaskData,
  selectTaskData,
} from "../../redux/task/selectors";
// api
import {
  updateTaskApi,
  resumeTaskApi,
  pauseTaskApi,
} from "../../services/api/task";
// hook
import useDispatch from "../redux/useDispatch";
import useNavigation from "../useNavigation";
// interface
import { ITaskState } from "../../redux/task";

type TTaskData = (data: ITaskState["taskData"]) => void;
type TVoid = () => void;

interface IUseUpdateTask {
  onUpdateTask: (values: {}) => void;
  onResumePress: TTaskData;
  onPausePress: TVoid;
  onMarkAsCompletedPress: TVoid;
  formData: any;
  timeProps: Pick<
    ITaskState["taskData"],
    "startTaskTime" | "endTime" | "duration"
  >;
}

export default () => {
  const { navigation, id } = useNavigation();

  const task: {} = id && useSelector(selectCurrentTaskData(id));
  const taskData = useSelector(selectTaskData);

  const { dispatch } = useDispatch();
  const formData = useSelector(selectTaskFormData(id));

  const { startTaskTime, endTime, duration } =
    useSelector(selectCurrentTaskData(id)) || {};

  const timeProps = id && { startTaskTime, endTime, duration };

  const onUpdateTask = useCallback(
    (values) => {
      const task = { ...values, id };

      dispatch(update, updateTaskApi, { task });
      navigation.goBack();
    },
    [id, dispatch, navigation]
  );

  const onResumePress = useCallback(
    (userData) => {
      if (!taskData.isPaused) return Alert.alert("Paused active task!!");
      const requestData = { ...(task || userData || taskData) };
      const params = {
        task: requestData,
        navigation,
      };

      dispatch(resume, resumeTaskApi, params);
    },
    [taskData, task, navigation]
  );

  const onPausePress = useCallback(() => {
    dispatch(pause, pauseTaskApi, { task: taskData });
  }, [dispatch, taskData]);

  const onMarkAsCompletedPress = useCallback(() => {
    const params = { task: { id, isCompleted: true }, navigation };

    dispatch(update, updateTaskApi, params);
  }, [dispatch, navigation]);

  return {
    onUpdateTask,
    onResumePress,
    onPausePress,
    onMarkAsCompletedPress,
    formData,
    timeProps,
  };
};
