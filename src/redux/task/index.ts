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
const REMOVE = "taskManager/task/remove";
const UPDATE = "taskManager/task/update";
const GET_INCOMPLETE = "taskManager/task/getIncomplate";
const GET_LIST = "taskManager/task/getList";
const CREATE = "taskManager/task/create";
const RESUME = "taskManager/task/resume";
const GET_TAGS = "taskManager/task/getTags";

// actions
export const start = createAction(START);
export const pause = createAction(PAUSE);
export const remove = createAction(REMOVE);
export const update = createAction(UPDATE);
export const getIncomplete = createAction(GET_INCOMPLETE);
export const getList = createAction(GET_LIST);
export const create = createAction(CREATE);
export const resume = createAction(RESUME);
export const getTags = createAction(GET_TAGS);

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
  tags: string[];
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
  tags: [],
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
    const failure = () => {
      draft.meta.isLoading = false;
      draft.meta.error = payload;
      console.log(payload);
    };

    switch (type) {
      case remove.REQUES:
        draft.meta.isLoading = true;
        return;
      case remove.SUCCESS:
        draft.meta.isLoading = false;
        draft.tasksList = draft.tasksList.filter(({ id }) => id !== payload);
        return draft;
      case remove.FAILURE:
        return failure();

      case update.REQUES:
        draft.meta.isLoading = true;
        return;
      case update.SUCCESS:
        draft.meta.isLoading = false;
        draft.tasksList = updateTasksList(draft.tasksList, payload);
        return draft;
      case update.FAILURE:
        return failure();

      case getIncomplete.REQUEST:
        draft.meta.isLoadingIncomplete = true;
        return;
      case getIncomplete.SUCCESS:
        draft.taskData =
          (payload && { ...draft.taskData, ...payload }) || draft.taskData;
        draft.meta.isLoadingIncomplete = false;
        return;
      case getIncomplete.FAILURE:
        return failure();

      case getList.REQUEST:
        draft.meta.isLoading = true;
        return;
      case getList.SUCCESS:
        draft.tasksList = payload;
        draft.meta.isLoading = false;
        return;
      case getList.FAILURE:
        return failure();

      case create.REQUEST:
        draft.meta.isLoading = true;
        return;
      case create.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = { ...draft.taskData, ...payload };
        // draft.tasksList = [...(draft.tasksList || []), payload];
        return;
      case create.FAILURE:
        return failure();

      case resume.REQUEST:
        draft.meta.isLoading = true;
        return;
      case resume.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = payload;
        draft.tasksList = updateTasksList(draft.tasksList, payload);
        return;
      case resume.FAILURE:
        return failure();

      case pause.REQUEST:
        draft.meta.isLoading = true;
        return;
      case pause.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = initialState.taskData;
        draft.tasksList = updateTasksList(draft.tasksList, payload);
        return;
      case pause.FAILURE:
        return failure();

      case getTags.REQUEST:
        draft.meta.isLoading = true;
        return;
      case getTags.SUCCESS:
        draft.meta.isLoading = false;
        draft.tags = payload;
        return;
      case getTags.FAILURE:
        return failure();
      default:
        return draft;
    }
  }
);
