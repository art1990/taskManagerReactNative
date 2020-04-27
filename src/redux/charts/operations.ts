// redux
import { getLoggedTime, getLoggedTasks, getLoggedPerDay } from ".";
import { selectMeta } from "./selectors";
// saga
import { takeEvery, select } from "redux-saga/effects";
// date-fns
import { formatISO } from "date-fns";
// api
import { getWeekDataApi } from "../../services/api";
// handlers
import { apiHandler } from "../utils/apiHandler";
// utils
import { conversionToLoggedPerDay } from "../../utils/conversion";

function* getLoggedTimeForChart({ payload }) {
  const { lastLoggedTimeSnapshot, action } = yield select(selectMeta);

  const argApi = { ...payload, lastLoggedTimeSnapshot, action };
  yield apiHandler({ api: getWeekDataApi, argApi }, getLoggedTime);
}
function* getLoggedTasksForChart({ payload }) {
  const { lastLoggedTasksSnapshot, action } = yield select(selectMeta);

  const argApi = { ...payload, lastLoggedTasksSnapshot, action };
  yield apiHandler({ api: getWeekDataApi, argApi }, getLoggedTasks);
}
function* getLoggedPerDayForChart({ payload }) {
  const { currentPerDay } = yield select(selectMeta);

  const argApi = { currentPerDay };
  yield apiHandler(
    { api: getWeekDataApi, argApi },
    getLoggedPerDay,
    conversionToLoggedPerDay
  );
}

export default function* watchCharts() {
  yield takeEvery(getLoggedTime.REQUEST, getLoggedTimeForChart);
  yield takeEvery(getLoggedTasks.REQUEST, getLoggedTasksForChart);
  yield takeEvery(getLoggedPerDay.REQUEST, getLoggedPerDayForChart);
}
