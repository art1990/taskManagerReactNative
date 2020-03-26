// redux
import { createAction } from "redux-saga-actions";
import actionCreator from "../utils/actionCreator";
// immer
import produce, { Draft } from "immer";
// utils
import { updateTasksList } from "../utils/reducer";

// action types
const START = "taskManager/task/start";
const PAUSE = "taskManager/task/pause";
const ADD = "taskManager/task/add";
const REMOVE = "taskManager/task/remove";
const UPDATE = "taskManager/task/update";
const GET_INCOMPLETE = "taskManager/task/getIncomplate";
const GET_LIST = "taskManager/task/getList";
const CREATE = "taskManager/task/create";
const RESUME = "taskManager/task/resume";

// actions
export const start = createAction(START);
export const pause = createAction(PAUSE);
export const add = createAction(ADD);
export const remove = createAction(REMOVE);
export const update = createAction(UPDATE);
export const getIncomplete = createAction(GET_INCOMPLETE);
export const getList = createAction(GET_LIST);
export const create = createAction(CREATE);
export const resume = createAction(RESUME);

// initial state
export interface ITaskState {
  tasksList: null | object[];
  taskData: {
    id: null | string;
    title: string;
    project: string;
    startTime?: number;
    endTime?: number;
    startTaskTime?: number;
    duration?: number;
    isPaused: boolean;
    isCompleted: boolean;
    file: null | object[];
  };
  meta: { isLoading: boolean; isLoadingIncomplete: boolean; error: null | {} };
}

const initialState: ITaskState = {
  tasksList: null,
  taskData: {
    id: null,
    title: "",
    project: "",
    startTime: null,
    endTime: null,
    startTaskTime: null,
    duration: 0,
    isPaused: false,
    isCompleted: false,
    file: null
  },
  meta: {
    isLoading: false,
    isLoadingIncomplete: false,
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
        draft.taskData = { ...draft.taskData, ...payload };
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
        draft.tasksList = updateTasksList(draft.tasksList, payload);
        return draft;
      case update.FAILURE:
        draft.meta.isLoading = false;
        draft.meta.error = payload;
        return;

      case getIncomplete.REQUEST:
        draft.meta.isLoadingIncomplete = true;
        return;
      case getIncomplete.SUCCESS:
        draft.taskData =
          (payload && { ...draft.taskData, ...payload }) || draft.taskData;
        draft.meta.isLoadingIncomplete = false;
        return;
      case getIncomplete.FAILURE:
        draft.meta.error = payload;
        draft.meta.isLoadingIncomplete = false;
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

      case create.REQUEST:
        draft.meta.isLoading = true;
        return;
      case create.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = { ...draft.taskData, ...payload };
        // draft.tasksList = [...(draft.tasksList || []), payload];
        return;
      case create.FAILURE:
        draft.meta.isLoading = false;
        draft.meta.error = payload;
        return;

      case resume.REQUEST:
        draft.meta.isLoading = true;
        return;
      case resume.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = payload;
        draft.tasksList = updateTasksList(draft.tasksList, payload);
        return;
      case resume.FAILURE:
        draft.meta.isLoading = false;
        draft.meta.error = payload;
        return;

      case pause.REQUEST:
        draft.meta.isLoading = true;
        return;
      case pause.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = initialState.taskData;
        draft.tasksList = updateTasksList(draft.tasksList, payload);
        return;
      case pause.FAILURE:
        draft.meta.isLoading = false;
        draft.meta.error = payload;
        return;
      default:
        return draft;
    }
  }
);
