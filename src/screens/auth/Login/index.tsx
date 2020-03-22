// react
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// redux
import { useDispatch } from "react-redux";
import { login } from "../../../redux/user";
// components
import LoginForm from "../../../components/forms/LoginForm";
import Title from "../../../components/Title";
import NavigationMessage from "../../../components/NavigationMessage";
// screens
import Input from "../../../components/Input";
import Button from "../../../components/Button";
// constants
import { Routes } from "../../../navigation/routes";

interface ILogin {
  navigation: any;
}

const Login: React.FC<ILogin> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const onLoginPress = () => {
    dispatch(login.request({ email, password }));
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
  container: {}
});

export default Login;
