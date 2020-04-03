// redux
import { getLoggedTime, getLoggedTasks, getLoggedPerDay } from ".";
import { selectMeta } from "./selectors";
// saga
import { takeEvery, take, select, put } from "redux-saga/effects";
// api
import { getWeekDataApi } from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// date
import { getUnixTime } from "date-fns";
// constants
import { Routes } from "../../navigation/routes";

function* getLoggedTimeForChart({ payload }) {
  const { lastLoggedTimeSnapshot, action } = yield select(selectMeta);

  const argApi = { ...payload, lastLoggedTimeSnapshot, action };
  yield apiHandler({ api: getWeekDataApi, argApi }, getLoggedTime);
}
function* getLoggedTasksForChart({ payload }) {
  const { lastLoggedTaskSnapshot, action } = yield select(selectMeta);

  const argApi = { ...payload, lastLoggedTaskSnapshot, action };
  yield apiHandler({ api: getWeekDataApi, argApi }, getLoggedTasks);
}
function* getLoggedPerDayForChart({ payload }) {}

export default function* watchCharts() {
  yield takeEvery(getLoggedTime.REQUEST, getLoggedTimeForChart);
  yield takeEvery(getLoggedTasks.REQUEST, getLoggedTasksForChart);
  yield takeEvery(getLoggedPerDay.REQUEST, getLoggedPerDayForChart);
}
