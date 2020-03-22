// react
import React from "react";
import { View } from "react-native";
// navigation
import { createStackNavigator } from "@react-navigation/stack";
// screens
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
// constants
import { Routes } from "./routes";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName={Routes.LOGIN}>
    <AuthStack.Screen name={Routes.LOGIN} component={Login} />
    <AuthStack.Screen name={Routes.SIGNUP} component={SignUp} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;