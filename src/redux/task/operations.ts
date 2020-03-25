// redux
import {
  create,
  resume,
  start,
  add,
  remove,
  update,
  getIncomplete,
  getList
} from ".";
import { selectUser } from "../user/selectors";
import { initialize } from "../user";
// saga
import { takeEvery, take, select, put } from "redux-saga/effects";
// api
import {
  initializeVariableToApiService,
  uploadFileApi,
  updateIncompleteTaskApi,
  addTaskApi,
  updateTaskApi,
  removeTaskApi,
  getIncompleteTaskApi,
  getTaskListApi
} from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// date
import { getUnixTime } from "date-fns";

function* startTask({ payload }) {
  let file = null;
  let argApi = {};

  if (!payload.id) {
    if (payload.file) {
      const uri = yield apiHandler({
        api: uploadFileApi,
        argApi: payload.file
      });

      file = {
        name: payload.file.name,
        size: payload.file.size,
        uri
      };
    }
  }

  let { startTaskTime, startTime } = payload;
  startTaskTime = startTaskTime || startTime;

  argApi = { ...payload, startTaskTime, isPaused: false, file };
  yield apiHandler({ api: updateIncompleteTaskApi, argApi }, start);
}

function* createTask({ payload }) {
  try {
    let file = null;
    let argApi = {};

    if (payload.file) {
      const uri = yield apiHandler({
        api: uploadFileApi,
        argApi: payload.file
      });

      file = {
        name: payload.file.name,
        size: payload.file.size,
        uri
      };
    }

    const startTaskTime = payload.startTime;

    argApi = { ...payload, startTaskTime, isPaused: false, file };
    yield apiHandler({ api: updateIncompleteTaskApi, argApi });
    yield apiHandler({ api: addTaskApi, argApi });
    yield put(create.success(argApi));
  } catch (err) {
    yield put(create.failure(err));
  }
}

function* resumeTask({ payload }) {
  try {
    yield apiHandler({ api: updateIncompleteTaskApi, argApi: payload });
    yield apiHandler({ api: updateTaskApi, argApi: payload });
    yield put(resume.success(payload));
  } catch (err) {
    yield put(resume.failure(err));
  }
}

function* addTask({ payload }) {
  const endTime = getUnixTime(new Date());
  const duration = endTime - payload.startTime;
  const argApi = {
    ...payload,
    endTime,
    duration,
    isPaused: true
  };

  yield apiHandler({ api: addTaskApi, argApi }, add);
  yield apiHandler({ api: updateIncompleteTaskApi });
}

function* removeTask({ payload }) {
  yield apiHandler({ api: removeTaskApi, argApi: payload }, remove);
}

function* updateTask({ payload }) {
  yield apiHandler({ api: updateTaskApi, argApi: payload }, update);
}

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
  yield takeEvery(create.REQUEST, createTask);
  yield takeEvery(resume.REQUEST, resumeTask);
  yield takeEvery(add.REQUEST, addTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
  yield takeEvery(getIncomplete.REQUEST, getIncompleteTask);
  yield takeEvery(getList.REQUEST, getTasksList);
}
