// redux
import { start, add, remove, update } from "./index";
// saga
import { takeEvery, put } from "redux-saga/effects";
// utils
import { db, firebaseApp } from "../../db";

const auth = firebaseApp.auth();

function* startTask() {}

function* addTask({ payload: { title, project } }) {
  try {
  } catch (err) {}
}

function* removeTask({ payload: { id } }) {}

function* updateTask() {}

export default function* watchTask() {
  yield takeEvery(start.type, startTask);
  yield takeEvery(add.REQUEST, addTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
}
