// react
import React from "react";
import { StyleSheet, View } from "react-native";
// redux
import { useDispatch } from "react-redux";
import { register } from "../../../redux/user/index";
// components
import SignUpForm from "../../../components/forms//SignUpForm";
import Title from "../../../components/Title";
import NavigationMessage from "../../../components/NavigationMessage";
// navigate
import { Routes } from "../../../navigation/routes";
// styles
import Styles from "../../../assets/styles";
// types
import { ILoginProps } from "../../../types";

const SignUp: React.FC<ILoginProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSignUpPress = (data) => {
    dispatch(register.request(data));
  };

  const toSignIn = () => {
    navigation.navigate(Routes.LOGIN);
  };

  return (
    <View style={[Styles.authWrapper, Styles.authContainer, styles.container]}>
      <Title text="Sign-up" />
      <SignUpForm onSubmit={onSignUpPress} />
      <NavigationMessage
        text="Already have an account?"
        buttonText="Sign In"
        goTo={toSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 28,
  },
});

export default SignUp;
