// firebase
import { db, firebaseApp, storage } from "../fireBase";

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
export const uploadFileApi = async ({ file }) => {
  const response = await fetch(file.uri);
  const blob = await response.blob();

  const ref = storage.ref().child("file/" + file.name);
  const snapshot = await ref.put(blob);

  const uri = await snapshot.ref.getDownloadURL();

  return uri;
};

export const updateIncompleteTaskApi = async ({ userDoc, data }) => {
  await userDoc.update({
    taskData: { data }
  });

  return data;
};

export const addTaskApi = async ({ userDoc, task }) => {
  const tasksListCol = await userDoc.collection("tasksList");
  const { id } = await tasksListCol.add(task);
  task.id = id;
  await tasksListCol.doc(id).update({ id });

  return task;
};
