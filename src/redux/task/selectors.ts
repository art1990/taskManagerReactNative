// utils
import { searchTask } from "../utils/state";

export const selectTaskData = state => state.task.taskData;
export const selectTasksList = state => state.task.tasksList;
export const selectCurrentTaskData = searchId => state =>
  searchTask(searchId, state);

export const selectTaskFormData = searchId => state => {
  const task = searchTask(searchId, state);

  if (task) {
    const { title, project, file } = task;
    return { defaultValues: { title, project }, file };
  } else {
    return undefined;
  }
};

export const selectMeta = state => state.task.meta;
