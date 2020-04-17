// redux
import actionCreator, { createAction } from "../utils/actionCreator";
// immer
import produce, { Draft } from "immer";
// utils
import { updateTasksList } from "../utils/reducer";

// action types
const PAUSE = "taskManager/task/pause";
type PAUSE = typeof PAUSE;

const REMOVE = "taskManager/task/remove";
type REMOVE = typeof REMOVE;

const UPDATE = "taskManager/task/update";
type UPDATE = typeof UPDATE;

const GET_INCOMPLETE = "taskManager/task/getIncomplate";
type GET_INCOMPLETE = typeof GET_INCOMPLETE;

const GET_LIST = "taskManager/task/getList";
type GET_LIST = typeof GET_LIST;

const GET_MORE_LIST = "taskManager/task/getMoreList";
type GET_MORE_LIST = typeof GET_MORE_LIST;

const CREATE = "taskManager/task/create";
type CREATE = typeof CREATE;

const RESUME = "taskManager/task/resume";
type RESUME = typeof RESUME;

const GET_TAGS = "taskManager/task/getTags";
type GET_TAGS = typeof GET_TAGS;

const UPDATE_CURRENT_TAGS = "taskManager/task/updateCurrentTags";
type UPDATE_CURRENT_TAGS = typeof UPDATE_CURRENT_TAGS;

const UPDATE_FILTER = "taskManager/task/updateFilter";
type UPDATE_FILTER = typeof UPDATE_FILTER;

// actions
export const pause = createAction(PAUSE);
export const remove = createAction(REMOVE);
export const update = createAction(UPDATE);
export const getIncomplete = createAction(GET_INCOMPLETE);
export const getList = createAction(GET_LIST);
export const getMoreList = createAction(GET_MORE_LIST);
export const create = createAction(CREATE);
export const resume = createAction(RESUME);
export const getTags = createAction(GET_TAGS);
export const updateCurrentTags = actionCreator(UPDATE_CURRENT_TAGS);
export const updateFilter = actionCreator(UPDATE_FILTER);

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
    timeInterval: { startTime: number; endTime: number }[];
    duration?: number;
    isPaused: boolean;
    isCompleted: boolean;
    file: null | object[];
  };
  tags: { current: string[]; all: string[] };
  meta: {
    isLoading: boolean;
    isLoadingIncomplete: boolean;
    isLoadingTaskList: boolean;
    error: null | {};
    filters: string[];
    lastVisible: any;
    limit: number;
    tasksCount: number;
  };
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
    timeInterval: [],
    duration: 0,
    isPaused: false,
    isCompleted: false,
    file: null,
  },
  tags: { current: [], all: [] },
  meta: {
    isLoading: false,
    isLoadingIncomplete: false,
    isLoadingTaskList: false,
    error: null,
    filters: null,
    lastVisible: null,
    limit: 7,
    tasksCount: null,
  },
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

    const request = () => {
      draft.meta.isLoading = true;
    };

    switch (type) {
      case remove.REQUEST:
        return request();
      case remove.SUCCESS:
        draft.meta.isLoading = false;
        draft.tasksList = draft.tasksList.filter(({ id }) => id !== payload);
        return draft;
      case remove.FAILURE:
        return failure();

      case update.REQUEST:
        return request();
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
        draft.tasksList = payload.tasksList;
        draft.meta.isLoading = false;
        draft.meta.lastVisible = payload.lastVisible;
        draft.meta.tasksCount = payload.tasksCount;
        return;
      case getList.FAILURE:
        draft.meta.isLoading = false;
        draft.meta.error = payload;
        return;

      case getMoreList.REQUEST:
        draft.meta.isLoadingTaskList = true;
        return;
      case getMoreList.SUCCESS:
        draft.meta.isLoading = false;
        draft.meta.lastVisible = payload.lastVisible;
        draft.tasksList = [...draft.tasksList, ...payload.tasksList];
      case getMoreList.FAILURE:
        draft.meta.isLoadingTaskList = false;
        draft.meta.error = payload;
        return;

      case create.REQUEST:
        return request();
      case create.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = { ...draft.taskData, ...payload };
        return;
      case create.FAILURE:
        return failure();

      case resume.REQUEST:
        return request();
      case resume.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = payload;
        draft.tasksList = updateTasksList(draft.tasksList, payload);
        return;
      case resume.FAILURE:
        return failure();

      case pause.REQUEST:
        return request();
      case pause.SUCCESS:
        draft.meta.isLoading = false;
        draft.taskData = initialState.taskData;
        draft.tasksList = updateTasksList(draft.tasksList, payload);
        return;
      case pause.FAILURE:
        return failure();

      case getTags.REQUEST:
        return request();
      case getTags.SUCCESS:
        draft.meta.isLoading = false;
        draft.tags.all = payload;
        return;
      case getTags.FAILURE:
        return failure();

      case updateCurrentTags.type:
        draft.tags.current = payload;
        return;

      case updateFilter.type:
        draft.meta.filters = payload;
        return;

      default:
        return draft;
    }
  }
);
