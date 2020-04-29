// types
import { ITaskState } from "../task";

export const searchTask = (searchId, state): ITaskState["taskData"] =>
  state.task.tasksList?.find(({ id }) => id === searchId);
