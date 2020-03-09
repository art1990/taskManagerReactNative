// firebase
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG1lI3IFb1rBbyrXQxua8mna7eFNqfdHQ",
  authDomain: "task-manager-react-native.firebaseapp.com",
  projectId: "task-manager-react-native"
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export const db = firebase.firestore();
