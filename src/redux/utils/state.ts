export const searchTask = (searchId, state) =>
  state.task.tasksList.find(({ id }) => id === searchId);
