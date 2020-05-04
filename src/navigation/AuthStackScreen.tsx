// react
import React from "react";
// navigation
import { createStackNavigator } from "@react-navigation/stack";
// screens
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
// constants
import { Routes } from "./routes";
// styles
import { headerStyle } from "./styles";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName={Routes.LOGIN}
    screenOptions={headerStyle}
  >
    <AuthStack.Screen name={Routes.LOGIN} component={Login} />
    <AuthStack.Screen name={Routes.SIGNUP} component={SignUp} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
