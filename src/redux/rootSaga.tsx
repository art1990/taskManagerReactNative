// saga
import task from "./task/operations";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([task()]);
}
