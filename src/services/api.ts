// firebase
import { db, firebaseApp, storage } from "../fireBase";

/* START initialize user and userDoc variavle */
type UserDoc = firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>;
type User = firebase.User;

let userDoc: UserDoc, user: User;
export const initializeVariableToApiService: (userdata: {
  user: firebase.User;
}) => Promise<void> = async userData => {
  if (!userData.user) return;
  user = userData.user;
  userDoc = db.collection("users").doc(user.uid);
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

  const ref = storage.ref().child("file/" + file.name);
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
  const tasksListCol = await userDoc.collection("tasksList");
  const { id } = await tasksListCol.add(task);
  task.id = id;
  await tasksListCol.doc(id).update({ id });

  return task;
};

export const getIncompleteTaskApi = async () => {
  const res = await userDoc.get();
  const { taskData } = await res.data();

  return taskData;
};

export const getTaskListApi = async () => {
  const tasksListCollection = await userDoc.collection("tasksList").get();
  const tasksList = await tasksListCollection.docs.map(doc => doc.data());

  return tasksList;
};