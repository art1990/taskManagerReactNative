// react
import { Alert } from "react-native";
// redux
import { register, login, logout, updateUserPassword } from "./index";
// saga
import { takeEvery, put, select, call } from "redux-saga/effects";
// utils
import { db, firebaseApp } from "../../db";

function* registerUser({ payload: { email, password } }) {
  try {
    const { user } = yield firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password);
    yield db
      .collection("users")
      .doc(user.uid)
      .set({ email });
    yield put(register.success());
  } catch (err) {
    Alert.alert(err.message);
    yield put(register.failed({ err }));
  }
}

function* loginUser() {}

function* logoutUser() {}

function* updatePasswordUser() {}

export default function* watchIncrement() {
  yield takeEvery(register.REQUEST, registerUser);
  yield takeEvery(login.REQUEST, loginUser);
  yield takeEvery(logout.type, logoutUser);
  yield takeEvery(updateUserPassword.REQUEST, updatePasswordUser);
}
