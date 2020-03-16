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
  GET_INCOMPLETE = "taskManager/task/getIncomplate",
  GET_LIST = "taskManager/task/getList",

  UPLOAD_FILE = "taskManager/task/uploadFile"
}

// actions
export const start = createAction(Types.START);
export const stop = actionCreator(Types.STOP);
export const pause = actionCreator(Types.PAUSE);
export const add = createAction(Types.ADD);
export const remove = createAction(Types.REMOVE);
export const update = createAction(Types.UPDATE);
export const getIncomplete = createAction(Types.GET_INCOMPLETE);
export const getList = createAction(Types.GET_LIST);

export const uploadFile = createAction(Types.UPLOAD_FILE);

// initial state
interface ITaskState {
  tasksList: null | object[];
  taskData: {
    id: null | string;
    title: string;
    project: string;
    startTime?: object;
    endTime?: object;
    duration?: number;
    isPaused: boolean;
    file: null | object[];
  };
  meta: { isLoading: boolean; error: null | {} };
}

const initialState: ITaskState = {
  tasksList: null,
  taskData: {
    id: null,
    title: "",
    project: "",
    startTime: null,
    endTime: null,
    duration: null,
    isPaused: false,
    file: null
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
        return;
      case start.SUCCESS:
        draft.taskData = payload;
        draft.meta.isLoading = false;
        return;
      case start.FAILURE:
        draft.meta.error = payload;
        draft.meta.isLoading = false;
      case add.REQUEST:
        draft.meta.isLoading = true;
        return;

      case add.SUCCESS:
        draft.meta.isLoading = false;
        draft.tasksList = [...(draft.tasksList || []), payload];
        draft.taskData = initialState.taskData;
        return;
      case add.FAILURE:
        draft.meta.error = payload;
        draft.meta.isLoading = false;
        return;

      case getIncomplete.REQUEST:
        draft.meta.isLoading = true;
        return;
      case getIncomplete.SUCCESS:
        draft.taskData = payload;
        draft.meta.isLoading = false;
        return;
      case getIncomplete.FAILURE:
        draft.meta.error = payload;
        draft.meta.isLoading = false;
        return;

      case getList.REQUEST:
        draft.meta.isLoading = true;
        return;
      case getList.SUCCESS:
        draft.tasksList = payload;
        draft.meta.isLoading = false;
        return;
      case getList.FAILURE:
        draft.meta.error = payload;
        draft.meta.isLoading = false;
        return;

      default:
        return draft;
    }
  }
);
