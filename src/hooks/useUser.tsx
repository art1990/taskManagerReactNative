// react
import React, { useState } from "react";
// hook
import { useNavigation } from "@react-navigation/native";
// routes
import { Routes } from "../navigation/routes";
// api
import { signUpApi, signInApi, logoutApi } from "../services/api/user";

export default () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const setFunctionLoader = async (func, arg = undefined) => {
    setIsLoading(true);
    await func(arg);
    setIsLoading(false);
  };

  const onSignUpPress = async (data) => {
    setFunctionLoader(signUpApi, data);
  };
  const onSignInPress = (data) => {
    setFunctionLoader(signInApi, data);
  };
  const onLogoutPress = () => {
    setFunctionLoader(logoutApi);
  };

  const toSignIn = () => {
    navigation.navigate(Routes.LOGIN);
  };

  const toSignUp: () => void = () => {
    navigation.navigate(Routes.SIGNUP);
  };

  return {
    onSignUpPress,
    onSignInPress,
    onLogoutPress,
    toSignIn,
    toSignUp,
    isLoading,
  };
};
