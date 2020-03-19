// react
import React, { useEffect, useState } from "react";
// redux
import { useDispatch } from "react-redux";
import { register } from "../../../redux/user/index";
// components
import Input from "../../../components/Input";
import Button from "../../../components/Button";
// navigate
import { Routes } from "../../../navigation/routes";
// styles
import { StyleSheet, Text, View, Alert } from "react-native";

const SignUp: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState<string>("test@test.com");
  const [password, setPassword] = useState<string>("111111");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("111111");

  const dispatch = useDispatch();

  const onSignUpPress = () => {
    if (password !== passwordConfirm) return Alert.alert("password dont mutch");
    dispatch(register.request({ email, password }));
  };

  const toSignInPress = () => {
    navigation.navigate(Routes.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Input
        label="Email"
        placeholder="enter email..."
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Input
        label="Password"
        placeholder="enter password..."
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Input
        label="Repeat password"
        placeholder="repeat password..."
        secureTextEntry
        onChangeText={text => setPasswordConfirm(text)}
        value={passwordConfirm}
      />
      <View style={styles.alreadySection}>
        <Text>Already have an account?</Text>
        <Button onPress={toSignInPress}>Sign In</Button>
      </View>
      <Button onPress={onSignUpPress}>Sign up</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 44,

    backgroundColor: "#fff"
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 28
  },
  alreadySection: {
    flexDirection: "row",
    flex: 1
  }
});

export default SignUp;
