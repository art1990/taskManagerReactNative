// react
import React from "react";
// navigation
import MainStackNavigator from "./src/navigation/MainStackNavigator";
// hook
import { useAuth } from "./src/hooks/useAuth";
// styles
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default function App() {
  const { initializing, user } = useAuth();

  return (
    <View style={[styles.container, styles.horizontal]}>
      {initializing ? (
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
