// redux
import { createAction } from "redux-saga-actions";
import actionCreator from "../utils/actionCreator";
// immer
import produce, { Draft } from "immer";

// action types
const START = "taskManager/task/start";
const STOP = "taskManager/task/stop";
const PAUSE = "taskManager/task/pause";
const ADD = "taskManager/task/add";
const REMOVE = "taskManager/task/remove";
const UPDATE = "taskManager/task/update";
const GET_INCOMPLETE = "taskManager/task/getIncomplate";
const GET_LIST = "taskManager/task/getList";

// actions
export const start = createAction(START);
export const stop = actionCreator(STOP);
export const pause = actionCreator(PAUSE);
export const add = createAction(ADD);
export const remove = createAction(REMOVE);
export const update = createAction(UPDATE);
export const getIncomplete = createAction(GET_INCOMPLETE);
export const getList = createAction(GET_LIST);

// initial state
export interface ITaskState {
  tasksList: null | object[];
  taskData: {
    id: null | string;
    title: string;
    project: string;
    startTime?: number;
    endTime?: number;
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

      case remove.REQUES:
        draft.meta.isLoading = true;
        return;
      case remove.SUCCESS:
        draft.meta.isLoading = false;
        draft.tasksList = draft.tasksList.filter(({ id }) => id !== payload);
        return draft;
      case remove.FAILURE:
        draft.meta.isLoading = false;
        draft.meta.error = payload;
        return;

      case update.REQUES:
        draft.meta.isLoading = true;
        return;
      case update.SUCCESS:
        draft.meta.isLoading = false;
        draft.tasksList = draft.tasksList.map(task => {
          return task.id === payload.id ? { ...task, ...payload } : task;
        });
        return draft;
      case update.FAILURE:
        draft.meta.isLoading = false;
        draft.meta.error = payload;
        return;

      case getIncomplete.REQUEST:
        draft.meta.isLoading = true;
        return;
      case getIncomplete.SUCCESS:
        draft.taskData = payload || draft.taskData;
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
