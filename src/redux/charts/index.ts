// redux
import { createAction } from "redux-saga-actions";
import actionCreator from "../utils/actionCreator";
// immer
import produce, { Draft } from "immer";

// action types
const GET_LOGGED_TIME = "taskManager/charts/getLoggedTime";
const GET_LOGGED_TASKS = "taskManager/charts/getLoggedTasks";
const GET_LOGGED_PER_DAY = "taskManager/charts/getLoggedPerDay";
const UPDATE_META = "taskManager/charts/updateMeta";

// actions
export const getLoggedTime = createAction(GET_LOGGED_TIME);
export const getLoggedTasks = createAction(GET_LOGGED_TASKS);
export const getLoggedPerDay = createAction(GET_LOGGED_PER_DAY);
export const updateMeta = actionCreator(UPDATE_META);

// initial state
export interface IChartsState {
  loggedTime: {};
  loggedTasks: {};
  loggedPerDay: {};
  meta: {
    totalWeeks: number;
    currentWeekTimeNumber: number;
    currentWeekTaskNumber: number;
    lastLoggedTimeSnapshot: any;
    lastLoggedTaskSnapshot: any;
    lastLoggedPerTimeSnapshot: any;
    isLoadingLoggedTime: boolean;
    isLoadingLoggedTask: boolean;
    isLoadingLoggedPerDay: boolean;
    error: null | {};
    action: "next" | "prev";
  };
}

const initialState: IChartsState = {
  loggedTime: null,
  loggedTasks: null,
  loggedPerDay: null,
  meta: {
    totalWeeks: null,
    currentWeekTimeNumber: 1,
    currentWeekTaskNumber: 1,
    lastLoggedTimeSnapshot: null,
    lastLoggedTaskSnapshot: null,
    lastLoggedPerTimeSnapshot: null,
    isLoadingLoggedTime: false,
    isLoadingLoggedTask: false,
    isLoadingLoggedPerDay: false,
    error: null,
    action: null
  }
};
// reducer
export default produce(
  (
    draft: Draft<IChartsState> = initialState,
    { type, payload }: { type: string; payload?: any }
  ) => {
    const request = isLoading => {
      draft.meta[isLoading] = true;
    };

    const success = (section, isLoading) => {
      const { lastVisible, data, totalWeeks } = payload;

      draft.meta[isLoading] = false;
      draft.meta.totalWeeks = totalWeeks;
      draft.meta.action = null;
      draft.meta[
        `last${section[0].toUpperCase() + section.slice(1)}Snapshot`
      ] = lastVisible;
      draft[section] = data;
    };

    const failure = isLoading => {
      draft.meta[isLoading] = false;
      draft.meta.error = payload;
      draft.meta.action = null;
    };

    switch (type) {
      case getLoggedTime.REQUEST:
        return request("isLoadingLoggedTime");
      case getLoggedTime.SUCCESS:
        return success("loggedTime", "isLoadingLoggedTime");
      case getLoggedTime.FAILURE:
        return failure("isLoadingLoggedTime");

      case getLoggedTasks.REQUEST:
        return request("isLoadingLoggedTasks");
      case getLoggedTime.SUCCESS:
        return success("loggedTime", "isLoadingLoggedTasks");
      case getLoggedTime.FAILURE:
        return failure("isLoadingLoggedTasks");

      case getLoggedTasks.REQUEST:
        return request("isLoadingLoggedPerDay");
      case getLoggedTime.SUCCESS:
        return success("loggedTime", "isLoadingLoggedPerDay");
      case getLoggedTime.FAILURE:
        return failure("isLoadingLoggedPerDay");

      case updateMeta.type:
        draft.meta = { ...draft.meta, ...payload };
        return;

      default:
        return draft;
    }
  }
);
