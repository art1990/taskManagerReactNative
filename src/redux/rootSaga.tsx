// saga
import user from "./user/operations";
import task from "./task/operations";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([user(), task()]);
}
