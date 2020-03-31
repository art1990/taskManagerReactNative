// redux
import { createAction } from "redux-saga-actions";
// immer
import produce, { Draft } from "immer";

// action types
const GET_LOGGED_TIME = "taskManager/charts/getLoggedTime";
const GET_LOGGED_TASKS = "taskManager/charts/getLoggedTasks";
const GET_LOGGED_PER_DAY = "taskManager/charts/getLoggedPerDay";

// actions
export const getLoggedTime = createAction(GET_LOGGED_TIME);
export const getLoggedTasks = createAction(GET_LOGGED_TASKS);
export const getLoggedPerDay = createAction(GET_LOGGED_PER_DAY);

// initial state
export interface IChartsState {
  loggedTime: {};
  loggedTasks: {};
  loggedPerDay: {};
  meta: {
    isLoadingLoggedTime: boolean;
    isLoadingLoggedTask: boolean;
    isLoadingLoggedPerDay: boolean;
    error: null | {};
  };
}

const initialState: IChartsState = {
  loggedTime: null,
  loggedTasks: null,
  loggedPerDay: null,
  meta: {
    isLoadingLoggedTime: false,
    isLoadingLoggedTask: false,
    isLoadingLoggedPerDay: false,
    error: null
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
      draft.meta[isLoading] = false;
      draft[section] = payload;
    };

    const failure = isLoading => {
      draft.meta[isLoading] = false;
      draft.meta.error = payload;
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

      default:
        return draft;
    }
  }
);