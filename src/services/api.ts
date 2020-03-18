// firebase
import { db, firebaseApp } from "../fireBase";

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
