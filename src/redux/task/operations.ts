// redux
import { start, add, remove, update, getIncomplete, getList } from ".";
import { selectUser } from "../user/selectors";
import { initialize } from "../user";
// saga
import { takeEvery, put, take, select } from "redux-saga/effects";
// api
import {
  uploadFileApi,
  updateIncompleteTaskApi,
  addTaskApi
} from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// utils
import { db, storage, firebaseApp } from "../../fireBase";
// date
import { getUnixTime } from "date-fns";

const auth = firebaseApp.auth();

// user initialize in getIncomplete saga
let user: any, userDoc: any;

function* startTask({ payload }) {
  let file = null;

  if (payload.file) {
    const uri = yield apiHandler({
      api: uploadFileApi,
      argApi: payload
    });

    file = {
      name: payload.file.name,
      size: payload.file.size,
      uri
    };
  }

  const taskData = { ...payload, file };

  const argApi = { userDoc, taskData };
  yield apiHandler({ api: updateIncompleteTaskApi, argApi }, start);
}

function* addTask({ payload }) {
  const endTime = getUnixTime(new Date());
  const duration = endTime - payload.startTime;
  const task = {
    ...payload,
    endTime,
    duration
  };

  const argApi = { userDoc, task };

  yield apiHandler({ api: addTaskApi, argApi }, add);
  yield apiHandler({ api: updateIncompleteTaskApi, argApi: { userDoc } });
}

function* removeTask({ payload: { id } }) {}

function* updateTask() {}

function* getIncompleteTask() {
  try {
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
    const tasksListCol = yield userDoc.collection("tasksList").get();
    const tasksList = yield tasksListCol.docs.map(doc => doc.data());
    yield put(getList.success(tasksList));
  } catch (err) {
    yield put(getList.failure(err));
  }
}

export default function* watchTask() {
  yield take(initialize.type);
  yield takeEvery(start.REQUEST, startTask);
  yield takeEvery(add.REQUEST, addTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
  yield takeEvery(getIncomplete.REQUEST, getIncompleteTask);
  yield takeEvery(getList.REQUEST, getTasksList);
}
