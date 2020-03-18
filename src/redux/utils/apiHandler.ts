// react
import { Alert } from "react-native";
// redux
import { put, call } from "redux-saga/effects";

export function* apiHandler({ api, argApi }, action = undefined) {
  try {
    const res = yield call(api, argApi);
    yield action && put(action.success(res));

    return res;
  } catch (err) {
    yield action && put(action.failure(err));
    Alert.alert(err.message);
  }
}
