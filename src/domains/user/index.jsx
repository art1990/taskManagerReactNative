// redux
import { createAction } from "redux-saga-actions";
import actionCreator from "../utils/actionCreator";
// immer
import produce from "immer";
// firebase
import firebase from "firebase";
import { db } from "../../db";

// types
const REGISTER = "taskManager/user/register";
const LOGIN = "taskManager/user/login";
const LOGOUT = "taskManager/user/logout";
const UPDATE_PASSWORD = "taskManager/user/update-password";

// actions
export const register = createAction(REGISTER);
export const login = createAction(LOGIN);
export const logout = actionCreator(LOGOUT);
export const updateUserPassword = createAction(UPDATE_PASSWORD);

//reducer

const initialState = {
  user: null,
  loginning: false,
  registering: false,
  error: null
};

export default (state = initialState, { type, paload }) =>
  produce(state, draft => {
    switch (type) {
      case register.REQUEST:
        draft.registering = true;
        break;
      case register.SUCCESS:
        draft.registering = false;
        break;
      case register.FAILURE:
        draft.registering = false;
        draft.error = paload;
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
        draft.error = paload;
        break;

      case logout.type:
        draft.user = null;
        break;

      default:
        return draft;
    }
  });
