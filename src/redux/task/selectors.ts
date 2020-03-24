export const selectTaskData = state => state.task.taskData;
export const selectTasksList = state => state.task.tasksList;
export const selectCurrentTaskData = searchId => state =>
  state.task.tasksList.find(({ id }) => id === searchId);

export const selectTaskFormData = searchId => state => {
  const task = state.task.tasksList.find(({ id }) => id === searchId);

  if (task) {
    const { title, project, file } = task;
    return { title, project, file };
  } else {
    return undefined;
  }
};
