// redux
import { getLoggedTime, getLoggedTasks, getLoggedPerDay } from ".";
// saga
import { takeEvery, take, select, put } from "redux-saga/effects";
// api
import {} from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// date
import { getUnixTime } from "date-fns";
// constants
import { Routes } from "../../navigation/routes";

function* getLoggedTimeForChart({ payload }) {}
function* getLoggedTasksForChart({ payload }) {}
function* getLoggedPerDayForChart({ payload }) {}

export default function* watchCharts() {
  yield takeEvery(getLoggedTime.REQUEST, getLoggedTimeForChart);
  yield takeEvery(getLoggedTasks.REQUEST, getLoggedTasksForChart);
  yield takeEvery(getLoggedPerDay.REQUEST, getLoggedPerDayForChart);
}
