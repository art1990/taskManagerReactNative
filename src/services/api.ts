// firebase
import * as firebase from "firebase";
import { db, firebaseApp, storage } from "../fireBase";
// utils
import { getStartWeek } from "../utils/date";

/* START initialize user and userDoc variavle */
type UserDoc = firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>;
type User = firebase.User;

let userDoc: UserDoc, user: User, tasksListCol: any, weeksCol: any;
export const initializeVariableToApiService: (userdata: {
  user: firebase.User;
}) => Promise<void> = async userData => {
  if (!userData.user) return;
  user = userData.user;
  userDoc = db.collection("users").doc(user.uid);
  tasksListCol = userDoc?.collection("tasksList");
  weeksCol = userDoc?.collection("weeks");
};
/* END initialize user and userDoc variavle */
const auth = firebaseApp.auth();

const getDataFromUserDoc = async field => {
  const res = await userDoc.get();

  const { [field]: data } = res.data();

  return data;
};

// user
export const signUpApi = async ({ email, password }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  await db
    .collection("users")
    .doc(user.uid)
    .set({ email });
};

export const loginApi = async ({ email, password }) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);

  return user;
};

export const logoutApi = () => {
  auth.signOut();
};

// task
export const uploadFileApi = async file => {
  const response = await fetch(file.uri);
  const blob = await response.blob();

  const ref = storage.ref().child(`file/${user.uid}/${file.name}`);
  const snapshot = await ref.put(blob);

  const uri = await snapshot.ref.getDownloadURL();

  return uri;
};

export const updateIncompleteTaskApi = async (taskData = null) => {
  await userDoc.update({
    taskData
  });

  return taskData;
};

export const addTaskApi = async task => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const startWeek = getStartWeek();

  const taskData = {
    ...task,
    timestamp
  };

  if (taskData.id) return updateTaskApi(taskData);

  const { id } = await tasksListCol.add(taskData);
  taskData.id = id;
  await tasksListCol.doc(id).update({ id });
  await weeksCol.doc(startWeek).set(
    {
      tasksId: firebase.firestore.FieldValue.arrayUnion(id),
      timestamp
    },
    { merge: true }
  );

  return taskData;
};

export const updateTaskApi = async task => {
  await tasksListCol.doc(task.id).update(task);

  return task;
};

export const removeFileApi = async uri => {
  const ref = storage.refFromURL(uri);
  await ref.delete();

  return uri;
};

export const removeTaskApi = async ({ id, uri }) => {
  await tasksListCol.doc(id).delete();

  if (uri) await removeFileApi(uri);

  return id;
};

export const pauseTaskApi = async task => {
  await updateIncompleteTaskApi();
  const taskData = { ...task, isPaused: true };
  await updateTaskApi(taskData);

  return taskData;
};

export const resumeTaskApi = async task => {
  const taskData = { ...task, isPaused: false };
  await updateIncompleteTaskApi(taskData);
  await updateTaskApi(taskData);

  return taskData;
};

export const getIncompleteTaskApi = async () => {
  const taskData = await getDataFromUserDoc("taskData");

  return taskData;
};

export const getTaskListApi = async () => {
  const tasksListCollection = await tasksListCol.orderBy("timestamp").get();
  const tasksList = await tasksListCollection.docs.map(doc => doc.data());

  return tasksList;
};

// tags
export const getTagsApi = async () => {
  const tags = new Set();
  const tagsCol = await tasksListCol.get();
  await tagsCol.docs.forEach(doc =>
    doc.get("tags").forEach(el => tags.add(el))
  );

  return Array.from(tags);
};

// charts
const getLoggedTimeApi = async () => {};
const getLoggedTasksApi = async () => {};
const getLoggedPerDayApi = async () => {};
