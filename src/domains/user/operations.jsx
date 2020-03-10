// react
import { Alert } from "react-native";
// redux
import { register, login, logout, updateUserPassword } from "./index";
// saga
import { takeEvery, put, select } from "redux-saga/effects";
// firebase
import firebase from "firebase";
// utils
import { db } from "../../db";

/* function* getUsersFromDB({ payload: { currentPage, pageSize, query } }) {
  try {
    const data = yield db.table("users").orderBy(":id");
    let usersCount = yield data.count();

    let users;

    if (query) {
      const filteredData = yield data.filter(
        ({ firstName, lastName }) =>
          firstName.indexOf(query) !== -1 || lastName.indexOf(query) !== -1
      );

      usersCount = yield filteredData.count();
      users = yield filteredData
        .offset((currentPage - 1) * pageSize)
        .limit(pageSize)
        .toArray();
    } else {
      users = yield data
        .offset((currentPage - 1) * pageSize)
        .limit(pageSize)
        .toArray();
    }

    const totalPages = yield Math.ceil(usersCount / pageSize);

    users = users.length < 1 && totalPages >= 1 ? null : users;

    yield delay(650);
    yield put(
      getUsers.success({
        users,
        currentPage,
        totalPages,
        query
      })
    );
  } catch (error) {
    getUsers.failure();
  }
}

function* addUserDB({ payload: { user } }) {
  try {
    yield db.table("users").add({ ...user });

    yield put(addUser.success(user));
    yield put(push("/users"));
  } catch (error) {
    yield put(addUser.failure());
  }
}

function* updateUserData({ payload: { user, pathToUSerProfile } }) {
  try {
    yield db.table("users").update(user.id, { ...user });

    yield put(updateUser.success({ user: user }));
    yield put(push(pathToUSerProfile));
  } catch (error) {
    yield put(updateUser.failure);
  }
}

function* removeUser({ payload }) {
  const { currentPage, query } = yield select(selectMeta);

  try {
    yield db.table("users").delete(payload.id);

    yield put(deleteUser.success());
  } catch (error) {
    yield put(deleteUser.failure(error));
  }

  yield put(getUsers.request({ currentPage, pageSize: 10, query }));
}

function* getUserFormData({ payload: id }) {
  try {
    const userFormData = yield db.table("users").get(id);

    yield delay(650);
    yield put(getUser.success(userFormData));
  } catch (error) {
    yield put(getUser.failure(error));
  }
}

function* generateNewUser({ payload: num }) {
  const { currentPage, query } = yield select(selectMeta);

  try {
    const fakeUsers = yield new Array(num)
      .fill(0)
      .map(() => generateFakeData());

    yield db.table("users").bulkPut(fakeUsers);

    yield put(generateUser.success());
  } catch (error) {
    yield put(generateUser.failure(error));
  }

  yield put(getUsers.request({ currentPage, pageSize: 10, query }));
} */

function* registerUser({ payload: { email, password } }) {
  try {
    const { user } = yield firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    yield db
      .collection("users")
      .doc(user.uid)
      .set({
        email
      });
  } catch (err) {
    Alert.alert(err.message);
  }
}

function* loginUser() {}

function* logoutUser() {}

function* updatePasswordUser() {}

export default function* watchIncrement() {
  yield takeEvery(register.REQUEST, registerUser);
  yield takeEvery(login.REQUEST, loginUser);
  yield takeEvery(logout.type, logoutUser);
  yield takeEvery(updateUserPassword.REQUEST, updatePasswordUser);
}
