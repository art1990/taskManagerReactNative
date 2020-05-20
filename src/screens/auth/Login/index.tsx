// react
import React from "react";
import { StyleSheet, View } from "react-native";
// components
import LoginForm from "../../../components/forms/LoginForm";
import Title from "../../../components/Title";
import NavigationMessage from "../../../components/NavigationMessage";

// hook
import useUser from "../../../hooks/useUser";
// types
import { ILoginProps } from "../types";
// styles
import Styles from "../../../assets/styles";

const Login: React.FC<ILoginProps> = () => {
  const { onSignInPress, toSignUp, isLoading } = useUser();

  return (
    <View testID="welcome" style={[Styles.authWrapper, Styles.authContainer]}>
      <Title text="Sign in" />
      <LoginForm onSubmit={onSignInPress} isLoading={isLoading} />
      <NavigationMessage
        text="Don’t have an account yet?"
        buttonText="Sign up"
        goTo={toSignUp}
      />
    </View>
  );
};

export default Login;
