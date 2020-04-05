// react
import React from "react";
import { StyleSheet, View } from "react-native";
// redux
import { useDispatch } from "react-redux";
import { login } from "../../../redux/user";
// components
import LoginForm from "../../../components/forms/LoginForm";
import Title from "../../../components/Title";
import NavigationMessage from "../../../components/NavigationMessage";
// constants
import { Routes } from "../../../navigation/routes";
// types
import { ILoginProps } from "../../../types";

const Login: React.FC<ILoginProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const onLoginPress = (data) => {
    dispatch(login.request(data));
  };

  const toSignUp: () => void = () => {
    navigation.navigate(Routes.SIGNUP);
  };

  return (
    <View style={styles.container}>
      <Title text="Sign in" />
      <LoginForm onSubmit={onLoginPress} />
      <NavigationMessage
        text="Don’t have an account yet?"
        buttonText="Sign up"
        goTo={toSignUp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Login;
