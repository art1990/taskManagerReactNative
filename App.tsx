// react
import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
// navigation
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// redux
import configureStore from "./src/redux/configureStore";
import { Provider } from "react-redux";
// hook
import { useAuth } from "./src/hooks/useAuth";
// paper
import { Provider as PaperProvider } from "react-native-paper";
// utils for remove warning setTimeout
import "./src/utils/timeout";
// components
import Button from "./src/components/Button";

const { store } = configureStore();

export default function App() {
  const { initializing } = useAuth();

  return (
    <Provider store={store}>
      <PaperProvider>
        <View style={styles.container}>
          {initializing ? (
            <ActivityIndicator size="large" color="000ff" />
          ) : (
            <MainStackNavigator />
          )}
        </View>
      </PaperProvider>
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
