// redux
import { createAction } from "redux-saga-actions";
import actionCreator from "../utils/actionCreator";
// immer
import produce, { Draft } from "immer";

// types
const INITIALIZE = "taskManager/user/initialize";
const REGISTER = "taskManager/user/register";
const LOGIN = "taskManager/user/login";
const LOGOUT = "taskManager/user/logout";
const UPDATE_PASSWORD = "taskManager/user/update-password";

// actions
export const initialize = actionCreator(INITIALIZE);
export const register = createAction(REGISTER);
export const login = createAction(LOGIN);
export const logout = actionCreator(LOGOUT);
export const updateUserPassword = createAction(UPDATE_PASSWORD);

//initial state
interface UserState {
  user: null | {};
  loginning: boolean;
  registering: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  loginning: false,
  registering: false,
  error: null
};

//reducer
export default produce(
  (
    draft: Draft<UserState> = initialState,
    { type, payload }: { type: string; payload?: any }
  ) => {
    switch (type) {
      case initialize.type:
        draft.user = payload;
        return;

      case register.REQUEST:
        draft.registering = true;
        return;
      case register.SUCCESS:
        draft.user = payload;
        draft.registering = false;
        return;
      case register.FAILURE:
        draft.registering = false;
        draft.error = payload;
        return;

      case login.REQUEST:
        draft.loginning = true;
        return;
      case login.SUCCESS:
        draft.loginning = false;
        draft.user = payload;
        return;
      case login.FAILURE:
        draft.loginning = false;
        draft.error = payload;
        return;

      case logout.type:
        draft.user = null;
        return;

      default:
        return draft;
    }
  }
);
