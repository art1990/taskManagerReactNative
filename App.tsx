// react
import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
// navigation
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// redux
import configureStore from "./src/domains/configureStore";
import { Provider } from "react-redux";
import { logout } from "./src/domains/user";
// hook
import { useAuth } from "./src/hooks/useAuth";
// styles

// components
import Button from "./src/components/Button";

const store = configureStore();

export default function App() {
  const { initializing } = useAuth();

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {initializing ? (
          <ActivityIndicator size="large" color="000ff" />
        ) : (
          <MainStackNavigator />
        )}
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
