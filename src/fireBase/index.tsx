// firebase
import * as firebase from "firebase";
import "firebase/firestore";
// env
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGINING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "react-native-dotenv";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGINING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebase.firestore();
const storage = firebase.storage();

export { firebaseApp, db, storage, firebase };
