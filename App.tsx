// react
import React, { useEffect, useState } from "react";
// expo
import { AppLoading } from "expo";
// navigation
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// firebase
import * as firebase from "firebase";
// styles
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";

export default function App() {
  const [isLoadingComplate, setIsLoadingComplate] = useState(false);
  const [isAuthenticationReady, setisAuthenticationReady] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAG1lI3IFb1rBbyrXQxua8mna7eFNqfdHQ",
      authDomain: "task-manager-react-native.web.app"
    };

    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
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
