// redux
import { start, add, remove, update, getIncomplete, getList } from ".";
import { selectUser } from "../user/selectors";
import { initialize } from "../user";
// saga
import { takeEvery, take, select } from "redux-saga/effects";
// api
import {
  initializeVariableToApiService,
  uploadFileApi,
  updateIncompleteTaskApi,
  addTaskApi,
  getIncompleteTaskApi,
  getTaskListApi
} from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// date
import { getUnixTime } from "date-fns";

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

  const argApi = { ...payload, file };
  yield apiHandler({ api: updateIncompleteTaskApi, argApi }, start);
}

function* addTask({ payload }) {
  const endTime = getUnixTime(new Date());
  const duration = endTime - payload.startTime;
  const argApi = {
    ...payload,
    endTime,
    duration
  };

  yield apiHandler({ api: addTaskApi, argApi }, add);
  yield apiHandler({ api: updateIncompleteTaskApi });
}

function* removeTask({ payload: { id } }) {}

function* updateTask() {}

function* getIncompleteTask() {
  const userData = yield select(selectUser);
  yield initializeVariableToApiService(userData);

  yield apiHandler({ api: getIncompleteTaskApi }, getIncomplete);
}

function* getTasksList() {
  yield apiHandler({ api: getTaskListApi }, getList);
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