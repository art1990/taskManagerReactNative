export const selectTaskData = state => state.task.taskData;
export const selectTasksList = state => state.task.tasksList;
export const selectCurrentTaskData = searchId => state =>
  state.task.tasksList.find(({ id }) => id === searchId);
