// react
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// redux
import { useDispatch } from "react-redux";
import { login } from "../../../domains/user";
// screens
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const onLoginPress = () => {
    dispatch(login.request({ email, password }));
  };

  const toSignUp: () => void = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Input
        label="Email"
        placeholder="enter email..."
        keyboardType="email-address"
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
