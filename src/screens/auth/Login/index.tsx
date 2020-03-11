// react
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
// redux
import { useDispatch } from "react-redux";
import { login } from "../../../domains/user";
// screens
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onLoginPress = () => {
    dispatch(login.request({ email, password }));
  };

  const toSignUp = () => navigation.navigate("SignUp");

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Input
        label="Email"
        placeholder="enter email..."
        keyboardType="email-address"
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
      <Button onPress={onLoginPress}>Login</Button>
      <Button onPress={toSignUp}>Sign Up</Button>
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
