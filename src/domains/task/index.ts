// redux
import { createAction } from "redux-saga-actions";
import actionCreator from "../utils/actionCreator";
// immer
import produce, { Draft } from "immer";

// types
enum Types {
  START = "taskManager/task/start",
  STOP = "taskManager/task/stop",
  PAUSE = "taskManager/task/pause",
  CREATE = "taskManager/task/create",
  REMOVE = "taskManager/task/remove",
  UPDATE = "taskManager/task/update"
}

// actions
export const start = actionCreator(Types.START);
export const stop = actionCreator(Types.STOP);
export const pause = actionCreator(Types.PAUSE);
export const add = createAction(Types.CREATE);
export const remove = createAction(Types.REMOVE);
export const update = createAction(Types.UPDATE);

// initial state
interface TaskState {
  tasksList: null | [];
  taskData: {
    title: string;
    project: string;
    startTime?: object;
    endTime?: object;
    durationTime?: number;
    isPaused: boolean;
  };
  meta: { isLoading: boolean; error: null | {} };
}

const initialState: TaskState = {
  tasksList: null,
  taskData: {
    title: "",
    project: "",
    startTime: null,
    endTime: null,
    durationTime: null,
    isPaused: false
  },
  meta: {
    isLoading: false,
    error: null
  }
};

// reducer
export default produce(
  (
    draft: Draft<TaskState> = initialState,
    { type, payload }: { type: string; payload?: any }
  ) => {
    switch (type) {
      case start.type:
        draft.taskData.title = payload.title;
        draft.taskData.project = payload.project;
        draft.taskData.startTime = payload.startTime;

      default:
        return draft;
    }
  }
);
