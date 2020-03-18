// react
import { Alert } from "react-native";
// redux
import { put, call } from "redux-saga/effects";

export function* apiHandler({ api, argApi }, action) {
  try {
    const res = yield call(api, argApi);
    yield put(action.success(res));
  } catch (err) {
    yield put(action.failure(err));
    Alert.alert(err);
  }
}
