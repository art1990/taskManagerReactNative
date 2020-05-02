// react
import React, { useCallback } from "react";
// hook
import useNavigation from "../useNavigation";
// routes
import { Routes } from "../../navigation/routes";
// interface
import { ITaskState } from "../../redux/task/index";

type TVoid = () => void;
type TId = ITaskState["taskData"]["id"];

interface IUseTaskNavigation {
  toAddTask: TVoid;
  toFilters: TVoid;
  toView: (id: TId ) => void;
  toEdit: (_id?: TId) => void;
}

export default (): IUseTaskNavigation => {
  const { id, navigation } = useNavigation();

  const toAddTask = useCallback(() => {
    navigation.navigate(Routes.CREATE_TASK);
  }, [navigation]);

  const toView = useCallback(
    (id) => {
      navigation.navigate(Routes.VIEW_TASK, { id });
    },
    [navigation]
  );

  const toFilters = useCallback(() => {
    navigation.navigate(Routes.FILTERS);
  }, [navigation]);

  const toEdit = useCallback(
    (_id?: string): void => {
      navigation.navigate(Routes.EDIT_TASK, { id: id || _id });
    },
    [id, navigation]
  );

  return { toAddTask, toView, toFilters, toEdit };
};
