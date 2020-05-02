// redux
import { create, resume, pause, remove, update, getList, getTags } from ".";
// saga
import { takeEvery } from "redux-saga/effects";
// handlers
import { apiHandler } from "../utils/apiHandler";
// date
import { getUnixTime } from "date-fns";
import { dateNow } from "../../utils/date";
// constants
import { Routes } from "../../navigation/routes";

function* createTask({ payload: { navigation, api, ...payload } }) {
  const date = new Date();
  const startTaskTime = getUnixTime(date);

  const task = {
    ...payload,
    startTaskTime,
    startTime: startTaskTime,
    duration: 0,
    isCompleted: false,
    isPaused: false,
    timeInterval: [{ startTime: startTaskTime }],
    date: dateNow(date),
  };
  yield apiHandler({ task, api });
  yield navigation.navigate(Routes.TASKS_LIST);
}

function* removeTask({ payload }) {
  yield apiHandler(payload, undefined, Routes.TASKS_LIST);
}

function* pauseTask({ payload }) {
  const { task } = payload;
  const endTime = getUnixTime(new Date());
  const duration = endTime - task.startTime + task.duration;
  const timeInterval = task.timeInterval.map((el, i, arr) => {
    if (i === arr.length - 1) return { ...el, endTime };
    return el;
  });
  const argApi = {
    ...payload,
    task: { ...payload.task, timeInterval, endTime, duration },
  };
  yield apiHandler(argApi);
}

function* resumeTask({ payload: { navigation, ...payload } }) {
  const startTime = getUnixTime(new Date());

  const timeInterval = [...payload.task.timeInterval, { startTime }];

  const argApi = {
    ...payload,
    task: { ...payload.task, timeInterval, startTime },
  };
  yield apiHandler(argApi);
  if (navigation) yield navigation.navigate(Routes.TASKS_LIST);
}

function* updateTask({ payload }) {
  yield apiHandler(payload, undefined, "goBack");
}

function* getTasksList({ payload }) {
  yield apiHandler(payload);
}

function* getTagsList({ payload }) {
  yield apiHandler(payload);
}

export default function* watchTask() {
  yield takeEvery(create.REQUEST, createTask);
  yield takeEvery(pause.REQUEST, pauseTask);
  yield takeEvery(resume.REQUEST, resumeTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
  yield takeEvery(getList.REQUEST, getTasksList);
  yield takeEvery(getTags.REQUEST, getTagsList);
}
