// react
import { Alert } from "react-native";
// redux
import { put, call } from "redux-saga/effects";

export function* apiHandler(
  { api, argApi = undefined },
  action = undefined,
  convertResponse = (data) => data
) {
  try {
    const res = yield call(api, argApi);
    const convertRes = convertResponse(res);
    yield action && put(action.success(convertRes));

    return res;
  } catch (err) {
    yield action && put(action.failure(err));
    Alert.alert(err.message);
  }
}
