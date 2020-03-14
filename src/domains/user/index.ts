// redux
import { createAction } from "redux-saga-actions";
import actionCreator from "../utils/actionCreator";
// immer
import produce, { Draft } from "immer";

// types
enum Types {
  INITIALIZE = "taskManager/user/initialize",
  REGISTER = "taskManager/user/register",
  LOGIN = "taskManager/user/login",
  LOGOUT = "taskManager/user/logout",
  UPDATE_PASSWORD = "taskManager/user/update-password"
}

// actions
export const initialize = actionCreator(Types.INITIALIZE);
export const register = createAction(Types.REGISTER);
export const login = createAction(Types.LOGIN);
export const logout = actionCreator(Types.LOGOUT);
export const updateUserPassword = createAction(Types.UPDATE_PASSWORD);

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
        break;

      case register.REQUEST:
        draft.registering = true;
        break;
      case register.SUCCESS:
        draft.user = payload;
        draft.registering = false;
        break;
      case register.FAILURE:
        draft.registering = false;
        draft.error = payload;
        break;

      case login.REQUEST:
        draft.loginning = true;
        break;
      case login.SUCCESS:
        draft.loginning = false;
        draft.user = payload;
        break;
      case login.FAILURE:
        draft.loginning = false;
        draft.error = payload;
        break;

      case logout.type:
        draft.user = null;
        break;

      default:
        return draft;
    }
  }
);
