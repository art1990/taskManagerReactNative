// react
import React, { useEffect, useState } from "react";
// redux
import { useDispatch } from "react-redux";
import { register } from "../../../redux/user/index";
// components
import Button from "../../../components/Button";
import SignUpForm from "../../../components/forms//SignUpForm";
import Title from "../../../components/Title";
// navigate
import { Routes } from "../../../navigation/routes";
// styles
import { StyleSheet, Text, View, Alert } from "react-native";

const SignUp: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState<string>("test@test.com");
  const [password, setPassword] = useState<string>("111111");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("111111");

  const dispatch = useDispatch();

  const onSignUpPress = data => {
    if (password !== passwordConfirm) return Alert.alert("password dont mutch");
    dispatch(register.request(data));
  };

  const toSignInPress = () => {
    navigation.navigate(Routes.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Title text="Sign-up" />
      <SignUpForm onSubmit={onSignUpPress} />
      <View style={styles.alreadySection}>
        <Text style={styles.alreadyText}>Already have an account?</Text>
        <Button mode="text" onPress={toSignInPress}>
          Sign In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // paddingTop: 22,
    // paddingLeft: 24,
    // paddingRight: 24,
    // paddingBottom: 44,

    backgroundColor: "#fff"
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 28
  },
  alreadySection: {
    flexDirection: "row",
    flex: 0
  },
  alreadyText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 20
  }
});

export default SignUp;
