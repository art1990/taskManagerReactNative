// redux
import {
  create,
  resume,
  pause,
  remove,
  update,
  getIncomplete,
  getList,
  getTags
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
  getTaskListApi,
  getTagsApi
} from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// date
import { getUnixTime } from "date-fns";
import { dateNow } from "../../utils/date";
// constants
import { Routes } from "../../navigation/routes";

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
    const date = new Date();

    const startTaskTime = getUnixTime(date);

    argApi = {
      ...payload,
      startTaskTime,
      startTime: startTaskTime,
      file,
      date: dateNow(date)
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

function* removeTask({ payload }) {
  yield apiHandler({ api: removeTaskApi, argApi: payload }, remove);
}

function* updateTask({ payload: { navigation, ...payload } }) {
  yield apiHandler({ api: updateTaskApi, argApi: payload }, update);
  if (navigation) yield navigation.navigate(Routes.TASKS_LIST);
}

function* getIncompleteTask() {
  const userData = yield select(selectUser);
  yield initializeVariableToApiService(userData);

  yield apiHandler({ api: getIncompleteTaskApi }, getIncomplete);
}

function* getTasksList({ payload }) {
  yield apiHandler({ api: getTaskListApi, argApi: payload }, getList);
}

function* getTagsList() {
  yield apiHandler({ api: getTagsApi }, getTags);
}

export default function* watchTask() {
  yield take(initialize.type);
  yield takeEvery(create.REQUEST, createTask);
  yield takeEvery(pause.REQUEST, pauseTask);
  yield takeEvery(resume.REQUEST, resumeTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
  yield takeEvery(getIncomplete.REQUEST, getIncompleteTask);
  yield takeEvery(getList.REQUEST, getTasksList);
  yield takeEvery(getTags.REQUEST, getTagsList);
}
