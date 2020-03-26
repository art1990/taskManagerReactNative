// firebase
import { db, firebaseApp, storage } from "../fireBase";

/* START initialize user and userDoc variavle */
type UserDoc = firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>;
type User = firebase.User;

let userDoc: UserDoc, user: User, tasksListCol: any;
export const initializeVariableToApiService: (userdata: {
  user: firebase.User;
}) => Promise<void> = async userData => {
  if (!userData.user) return;
  user = userData.user;
  userDoc = db.collection("users").doc(user.uid);
  tasksListCol = userDoc?.collection("tasksList");
};
/* END initialize user and userDoc variavle */
const auth = firebaseApp.auth();

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
  if (task.id) return updateTaskApi(task);

  const { id } = await tasksListCol.add(task);
  task.id = id;
  await tasksListCol.doc(id).update({ id });

  return task;
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

export const resumeTaskApi = async () => {};

export const getIncompleteTaskApi = async () => {
  const res = await userDoc.get();
  const { taskData } = await res.data();

  return taskData;
};

export const getTaskListApi = async () => {
  const tasksListCollection = await tasksListCol.get();
  const tasksList = await tasksListCollection.docs.map(doc => doc.data());

  return tasksList;
};
