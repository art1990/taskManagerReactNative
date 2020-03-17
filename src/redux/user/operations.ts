// react
import { Alert } from "react-native";
// redux
import { register, login, logout, updateUserPassword } from "./index";
// saga
import { takeEvery, put } from "redux-saga/effects";
// utils
import { db, firebaseApp } from "../../fireBase";

const auth = firebaseApp.auth();

function* registerUser({ payload: { email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield db
      .collection("users")
      .doc(user.uid)
      .set({ email });
    yield put(register.success(user));
  } catch (err) {
    Alert.alert(err.message);
    yield put(register.failure({ err }));
  }
}

function* loginUser({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield put(login.success(user));
  } catch (err) {
    yield put(login.failure({ err }));
  }
}

function* logoutUser() {
  yield auth.signOut();
}

function* updatePasswordUser() {}

export default function* watchUser() {
  yield takeEvery(register.REQUEST, registerUser);
  yield takeEvery(login.REQUEST, loginUser);
  yield takeEvery(logout.type, logoutUser);
  yield takeEvery(updateUserPassword.REQUEST, updatePasswordUser);
}
