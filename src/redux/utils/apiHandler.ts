// react
import { Alert } from "react-native";
// redux
import { put, call } from "redux-saga/effects";

export function* apiHandler(
  payload,
  convertResponse = (data) => data,
  navigate = undefined
) {
  const {
    api: { api, firebase, reduxAction: action },
    meta,
    navigation,
    task,
    ...rest
  } = payload;
  try {
    const arg = { ...firebase, ...rest, meta };
    if (task) {
      arg.task = task;
    }
    const response = yield call(api, arg);
    const res =
      typeof meta !== "undefined" ? { ...response, ...meta } : response;
    const convertRes = convertResponse(res);
    yield action && put(action.success(convertRes));
    if (navigate === "goBack") return yield navigation?.goBack();
    if (navigate) yield navigation?.navigate(navigate);

    return res;
  } catch (err) {
    yield action && put(action.failure(err));
    console.log(err.message);
    Alert.alert(err.message);
  }
}
