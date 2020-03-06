// react
import React, { useEffect, useState } from "react";
// expo
import { AppLoading } from "expo";
// navigation
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// firebase
import * as firebase from "firebase";
import "firebase/firestore";
// styles
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAG1lI3IFb1rBbyrXQxua8mna7eFNqfdHQ",
  authDomain: "task-manager-react-native.firebaseapp.com",
  projectId: "task-manager-react-native"
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default function App() {
  const [isLoadingComplate, setIsLoadingComplate] = useState(false);
  const [isAuthenticationReady, setisAuthenticationReady] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  const onAuthStateChanged = user => {
    setisAuthenticationReady(true);
    setisAuthenticated(!!user);
  };

  return (
    <View style={[styles.container, styles.horizontal]}>
      {!isAuthenticationReady ? (
        <ActivityIndicator size="large" color="000ff" />
      ) : (
        <MainStackNavigator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
