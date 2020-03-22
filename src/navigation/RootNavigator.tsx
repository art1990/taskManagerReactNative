// react
import React from "react";
import { View, StyleSheet } from "react-native";
// navigation
import { NavigationContainer } from "@react-navigation/native";
// stack screens
import AuthStackScreen from "./AuthStackScreen";
import TabsScreen from "./TabsScreen";
// hooks
import { useAuth } from "../hooks/useAuth";

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {!user ? <AuthStackScreen /> : <TabsScreen />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  authWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 22,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 44
  },
  mainWrapper: {}
});

export default RootNavigator;
