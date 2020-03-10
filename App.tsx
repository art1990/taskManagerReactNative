// react
import React from "react";
// navigation
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// redux
import configureStore from "./src/domains/configureStore";
import { Provider } from "react-redux";
// hook
import { useAuth } from "./src/hooks/useAuth";
// styles
import { StyleSheet, View, ActivityIndicator } from "react-native";
// components
import Button from "./src/components/Button";
// firebase
import firebase from "firebase";

const store = configureStore();

export default function App() {
  const { initializing, user } = useAuth();

  const onLogOut = () => {
    firebase.auth().signOut();
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {initializing ? (
          <ActivityIndicator size="large" color="000ff" />
        ) : (
          <MainStackNavigator />
        )}
        {user && <Button onPress={onLogOut}>LogOut</Button>}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
