// react
import { Alert } from "react-native";
// redux
import { register, login, logout, updateUserPassword } from "./index";
// saga
import { takeEvery } from "redux-saga/effects";
// api
import { signUpApi, loginApi, logoutApi } from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";

function* registerUser({ payload }) {
  yield apiHandler({ api: signUpApi, argApi: payload }, register);
}

function* loginUser({ payload }) {
  yield apiHandler({ api: loginApi, argApi: payload }, login);
}

function* logoutUser() {
  yield logoutApi();
}

function* updatePasswordUser() {}

export default function* watchUser() {
  yield takeEvery(register.REQUEST, registerUser);
  yield takeEvery(login.REQUEST, loginUser);
  yield takeEvery(logout.type, logoutUser);
  yield takeEvery(updateUserPassword.REQUEST, updatePasswordUser);
}
