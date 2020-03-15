// firebase
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG1lI3IFb1rBbyrXQxua8mna7eFNqfdHQ",
  authDomain: "task-manager-react-native.firebaseapp.com",
  databaseURL: "https://task-manager-react-native.firebaseio.com",
  projectId: "task-manager-react-native",
  storageBucket: "task-manager-react-native.appspot.com",
  messagingSenderId: "483865679280",
  appId: "1:483865679280:web:20a38acb175ae6709e3275",
  measurementId: "G-VBJR9K6969"
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebase.firestore();
const storage = firebase.storage();

export { firebaseApp, db, storage };
