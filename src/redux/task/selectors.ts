// utils
import { searchTask } from "../utils/state";
// types
import { ITaskState } from "../task";

export const selectTaskData = (state) => state.task.taskData;
export const selectTasksList = (state) => state.task.tasksList;
export const selectCurrentTaskData = (searchId) => (
  state
): ITaskState["taskData"] => searchTask(searchId, state);

export const selectTaskFormData = (searchId) => (state) => {
  const task = searchTask(searchId, state);

  if (task) {
    const { title, project, file, tags } = task;
    return { defaultValues: { title, project, tags }, file };
  } else {
    return undefined;
  }
};

export const selectMeta = (state): ITaskState["meta"] => state.task.meta;

export const selectTags = (state) => state.task.tags;
