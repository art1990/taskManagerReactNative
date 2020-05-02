// firebase
import { db, firebase } from "../../fireBase";

const auth = firebase.auth();

export const signUpApi = async ({ email, password }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  await db.collection("users").doc(user.uid).set({ email });
};

export const signInApi = async ({ email, password }) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);

  return user;
};

export const logoutApi = () => {
  auth.signOut();
};
