// redux
import { start, add, remove, update, getIncomplete, getList } from ".";
import { selectUser } from "../user/selectors";
import { initialize } from "../user";
// saga
import { takeEvery, take, select } from "redux-saga/effects";
// api
import {
  uploadFileApi,
  updateIncompleteTaskApi,
  addTaskApi,
  getTaskListApi
} from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// utils
import { db } from "../../fireBase";
// date
import { getUnixTime } from "date-fns";

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
  const userData = yield select(selectUser);
  user = userData.user;
  userDoc = user && db.collection("users").doc(user.uid);

  yield apiHandler(
    { api: getIncompleteTask, argApi: { userDoc } },
    getIncomplete
  );
}

function* getTasksList() {
  const tasksCollection = yield userDoc.collection("tasksList");

  yield apiHandler(
    { api: getTaskListApi, argApi: { tasksCollection } },
    getList
  );
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
