// react
import React from "react";
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
import { StyleSheet, View } from "react-native";

const SignUp: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSignUpPress = data => {
    dispatch(register.request(data));
  };

  const toSignIn = () => {
    navigation.navigate(Routes.LOGIN);
  };

  return (
    <View style={styles.container}>
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
  container: {},
  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 28
  }
});

export default SignUp;
