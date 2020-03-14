// redux
import { start, add, remove, update, getIncomplete } from "./";
import { selectUser } from "../user/selectors";
// saga
import { takeEvery, put, call, select } from "redux-saga/effects";
// utils
import { db, firebaseApp } from "../../db";
// date
import { getUnixTime } from "date-fns";

const auth = firebaseApp.auth();

function* startTask({ payload }) {
  try {
    const { user } = yield select(selectUser);
    yield db
      .collection("users")
      .doc(user.uid)
      .update({ taskData: payload });

    yield put(start.success(payload));
  } catch (err) {
    yield put(start.failure(err));
  }
}

function* addTask({ payload }) {
  try {
    const endTime = getUnixTime(new Date());
    const duration = endTime - payload.startTime;
    yield put(add.success({ ...payload, endTime, duration }));
  } catch (err) {
    yield put(add.failure(err));
  }
}

function* removeTask({ payload: { id } }) {}

function* updateTask() {}

function* getIncompleteTask({ payload: { user } }) {
  try {
    // const { user } = yield select(selectUser);
    const res = yield db
      .collection("users")
      .doc(user.uid)
      .get();
    const { taskData } = yield res.data();
    yield put(getIncomplete.success(taskData));
  } catch (err) {
    yield put(getIncomplete.failure(err));
  }
}

export default function* watchTask() {
  yield takeEvery(start.REQUEST, startTask);
  yield takeEvery(add.REQUEST, addTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
  yield takeEvery(getIncomplete.REQUEST, getIncompleteTask);
}
