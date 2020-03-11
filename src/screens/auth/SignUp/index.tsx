// react
import React, { useEffect, useState } from "react";
// redux
import { useDispatch } from "react-redux";
import { register } from "../../../domains/user/index";
// components
import Input from "../../../components/Input";
import Button from "../../../components/Button";
// firebase
import * as firebase from "firebase";
import { db } from "../../../db";
// styles
import { StyleSheet, Text, View, Alert } from "react-native";

export default () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("111111");
  const [passwordConfirm, setPasswordConfirm] = useState("111111");

  const dispatch = useDispatch();

  const onSignUpPress = () => {
    if (password !== passwordConfirm) return Alert.alert("password dont mutch");
    dispatch(register.request({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
      <Input
        label="Email"
        placeholder="enter email..."
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <Input
        label="Password"
        placeholder="enter password..."
        secureTextEntry
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <Input
        label="Repeat password"
        placeholder="repeat password..."
        secureTextEntry
        onChangeText={passwordConfirm => setPasswordConfirm(passwordConfirm)}
        value={passwordConfirm}
      />
      <Button onPress={onSignUpPress}>Sign up</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
