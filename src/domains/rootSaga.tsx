// saga
import user from "./user/operations";
import task from "./task/operations";
import { all } from "redux-saga/effects";
import { actionsWatcherSaga } from "redux-saga-actions";

export default function* rootSaga() {
  yield all([user(), task(), actionsWatcherSaga()]);
}
