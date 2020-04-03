// utils
import { searchTask } from "../utils/state";
// interface
import { ITaskState } from ".";

export const selectTaskData = state => state.task.taskData;
export const selectTasksList = state => state.task.tasksList;
export const selectCurrentTaskData: any = searchId => state =>
  searchTask(searchId, state);

export const selectTaskFormData = searchId => state => {
  const task = searchTask(searchId, state);

  if (task) {
    const { title, project, file, tags } = task;
    return { defaultValues: { title, project, tags }, file };
  } else {
    return undefined;
  }
};

export const selectMeta = (state): ITaskState["meta"] => state.task.meta;

export const selectTags = state => state.task.tags;
