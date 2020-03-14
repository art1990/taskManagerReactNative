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
  ADD = "taskManager/task/add",
  REMOVE = "taskManager/task/remove",
  UPDATE = "taskManager/task/update",
  GET_INCOMPLETE = "taskManager/task/getIncomplate"
}

// actions
export const start = createAction(Types.START);
export const stop = actionCreator(Types.STOP);
export const pause = actionCreator(Types.PAUSE);
export const add = createAction(Types.ADD);
export const remove = createAction(Types.REMOVE);
export const update = createAction(Types.UPDATE);
export const getIncomplete = createAction(Types.GET_INCOMPLETE);

// initial state
interface ITaskState {
  tasksList: null | object[];
  taskData: {
    title: string;
    project: string;
    startTime?: object;
    endTime?: object;
    duration?: number;
    isPaused: boolean;
  };
  meta: { isLoading: boolean; error: null | {} };
}

const initialState: ITaskState = {
  tasksList: null,
  taskData: {
    title: "",
    project: "",
    startTime: null,
    endTime: null,
    duration: null,
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
    draft: Draft<ITaskState> = initialState,
    { type, payload }: { type: string; payload?: any }
  ) => {
    switch (type) {
      case start.REQUEST:
        draft.meta.isLoading = true;
        break;
      case start.SUCCESS:
        console;
        draft.taskData = payload;
        draft.meta.isLoading = false;
        break;
      case start.FAILURE:
        draft.meta.error = payload;
        draft.meta.isLoading = false;
      case add.REQUEST:
        draft.meta.isLoading = true;
        break;
      case add.SUCCESS:
        draft.meta.isLoading = false;
        draft.tasksList = draft.tasksList
          ? [...draft.tasksList, payload]
          : [payload];
        draft.taskData = initialState.taskData;
        break;
      case add.FAILURE:
        draft.meta.error = payload;
        draft.meta.isLoading = false;
        break;

      case getIncomplete.REQUEST:
        draft.meta.isLoading = true;
        break;
      case getIncomplete.SUCCESS:
        draft.taskData = payload;
        draft.meta.isLoading = false;
        break;
      case getIncomplete.FAILURE:
        console.log(payload);
        draft.meta.error = payload;
        draft.meta.isLoading = false;

      default:
        return draft;
    }
  }
);
