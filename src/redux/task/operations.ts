// redux
import {
  create,
  resume,
  pause,
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
  pauseTaskApi,
  resumeTaskApi,
  getIncompleteTaskApi,
  getTaskListApi
} from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// date
import { getUnixTime } from "date-fns";
// constants
import { Routes } from "../../navigation/routes";

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

function* createTask({ payload: { navigation, ...payload } }) {
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

    const startTaskTime = getUnixTime(new Date());

    argApi = {
      ...payload,
      startTaskTime,
      startTime: startTaskTime,
      file
    };
    const task = yield apiHandler({ api: addTaskApi, argApi });
    yield apiHandler({ api: updateIncompleteTaskApi, argApi: task });
    yield navigation.navigate(Routes.TASKS_LIST);
    yield put(create.success(task));
  } catch (err) {
    yield put(create.failure(err));
  }
}

function* pauseTask({ payload }) {
  const endTime = getUnixTime(new Date());
  const duration = endTime - payload.startTime + payload.duration;
  const argApi = {
    ...payload,
    endTime,
    duration
  };
  yield apiHandler({ api: pauseTaskApi, argApi }, pause);
}

function* resumeTask({ payload: { navigation, ...payload } }) {
  const startTime = getUnixTime(new Date());

  const argApi = { ...payload, startTime };
  yield apiHandler({ api: resumeTaskApi, argApi }, resume);
  if (navigation) yield navigation.navigate(Routes.TASKS_LIST);
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
  yield takeEvery(pause.REQUEST, pauseTask);
  yield takeEvery(resume.REQUEST, resumeTask);
  yield takeEvery(add.REQUEST, addTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
  yield takeEvery(getIncomplete.REQUEST, getIncompleteTask);
  yield takeEvery(getList.REQUEST, getTasksList);
}
