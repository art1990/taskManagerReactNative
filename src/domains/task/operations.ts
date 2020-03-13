// redux
import { start, create, remove, update } from "./index";
// saga
import { takeEvery, put } from "redux-saga/effects";
// utils
import { db, firebaseApp } from "../../db";

const auth = firebaseApp.auth();

function* startTask() {}

function* createTask({ payload: { title, project } }) {
  try {
  } catch (err) {}
}

function* removeTask({ payload: { id } }) {}

function* updateTask() {}

export default function* watchTask() {
  yield takeEvery(start.type, startTask);
  yield takeEvery(create.REQUEST, createTask);
  yield takeEvery(remove.REQUEST, removeTask);
  yield takeEvery(update.REQUEST, updateTask);
}
