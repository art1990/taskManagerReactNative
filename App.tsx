// react
import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
// navigation
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// redux
import configureStore from "./src/domains/configureStore";
import { Provider } from "react-redux";
import { logout } from "./src/domains/user";
// persistor
import { PersistGate } from "redux-persist/lib/integration/react";
// hook
import { useAuth } from "./src/hooks/useAuth";
// styles

// components
import Button from "./src/components/Button";

const { store, persistor } = configureStore();

export default function App() {
  const { initializing } = useAuth();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          {initializing ? (
            <ActivityIndicator size="large" color="000ff" />
          ) : (
            <MainStackNavigator />
          )}
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  }
});
