export const updateTasksList = (tasksList, payload) =>
  tasksList.map(task => {
    return task.id === payload.id ? { ...task, ...payload } : task;
  });
