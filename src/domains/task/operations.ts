// redux
import { start, add, remove, update, getIncomplete, getList } from "./";
import { selectUser } from "../user/selectors";
import { initialize } from "../user";
// saga
import { takeEvery, put, take, select } from "redux-saga/effects";
// utils
import { db, firebaseApp } from "../../db";
// date
import { getUnixTime } from "date-fns";

const auth = firebaseApp.auth();

// user initialize in getIncomplete saga
let user, userDoc;

function* startTask({ payload }) {
  try {
    // const { user } = yield select(selectUser);
    yield userDoc.update({ taskData: payload });

    yield put(start.success(payload));
  } catch (err) {
    yield put(start.failure(err));
  }
}

function* addTask({ payload }) {
  try {
    // const { user } = yield select(selectUser);

    const endTime = getUnixTime(new Date());
    const duration = endTime - payload.startTime;
    const task = {
      ...payload,
      endTime,
      duration
    };
    const tasksListCol = yield userDoc.collection("tasksList");
    const { id } = yield tasksListCol.add(task);
    task.id = id;
    yield tasksListCol.doc(id).update({ id });
    yield userDoc.update({ taskData: null });
    yield put(add.success(task));
  } catch (err) {
    yield put(add.failure(err));
  }
}

function* removeTask({ payload: { id } }) {}

function* updateTask() {}

function* getIncompleteTask() {
  try {
    yield take(initialize.type);
    const userData = yield select(selectUser);
    user = userData.user;
    userDoc = user && db.collection("users").doc(user.uid);
    const res = yield userDoc.get();
    const { taskData } = yield res.data();
    yield put(getIncomplete.success(taskData));
  } catch (err) {
    yield put(getIncomplete.failure(err));
  }
}

function* getTasksList() {
  try {
    yield take(initialize.type);
    const tasksListCol = yield userDoc.collection("tasksList").get();
    const tasksList = yield tasksListCol.docs.map(doc => doc.data());
    yield put(getList.success(tasksList));
  } catch (err) {
    yield put(getList.failure(err));
  }
}

export default function* watchTask() {
  yield takeEvery(start.REQUEST, startTask);
  yield takeEvery(add.REQUEST, addTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
  yield takeEvery(getIncomplete.REQUEST, getIncompleteTask);
  yield takeEvery(getList.REQUEST, getTasksList);
}
