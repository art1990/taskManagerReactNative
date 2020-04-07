// react
import React from "react";
// redux
import { useSelector } from "react-redux";
import { selectLoading } from "../redux/user/selectors";
// components
import Spinner from "../components/Spinner";
// navigation
import { NavigationContainer } from "@react-navigation/native";
// stack screens
import AuthStackScreen from "./AuthStackScreen";
import TabsScreen from "./TabsScreen";
// hooks
import { useAuth } from "../hooks/useAuth";

const RootNavigator = () => {
  const { user } = useAuth();
  const isLoader = useSelector(selectLoading);

  if (isLoader) return <Spinner />;

  return (
    <NavigationContainer>
      {!user ? <AuthStackScreen /> : <TabsScreen />}
    </NavigationContainer>
  );
};

export default RootNavigator;
