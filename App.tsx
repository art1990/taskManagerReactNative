// react
import React, { useEffect, useState } from "react";
// navigation
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// firebase
import * as firebase from "firebase";
// styles
import { StyleSheet, Text, View, Alert } from "react-native";

export default function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAG1lI3IFb1rBbyrXQxua8mna7eFNqfdHQ",
      authDomain: "task-manager-react-native.web.app"
    };

    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
  }, []);

  return <MainStackNavigator />;
}
