// react
import React from "react";
import { StyleSheet, View } from "react-native";
// components
import SignUpForm from "../../../components/forms//SignUpForm";
import Title from "../../../components/Title";
import NavigationMessage from "../../../components/NavigationMessage";
// hooks
import useUser from "../../../hooks/useUser";
// styles
import Styles from "../../../assets/styles";
// types
import { ILoginProps } from "../types";

const SignUp: React.FC<ILoginProps> = () => {
  const { onSignUpPress, toSignIn, isLoading } = useUser();

  return (
    <View style={[Styles.authWrapper, Styles.authContainer]}>
      <Title text="Sign-up" />
      <SignUpForm onSubmit={onSignUpPress} isLoading={isLoading} />
      <NavigationMessage
        text="Already have an account?"
        buttonText="Sign In"
        goTo={toSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 28,
  },
});

export default SignUp;
