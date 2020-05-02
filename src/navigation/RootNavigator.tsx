// react
import React from "react";
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

export default RootNavigator;
