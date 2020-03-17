// react
import React, { useEffect, useState } from "react";
// redux
import { useDispatch } from "react-redux";
import { register } from "../../../redux/user/index";
// components
import Input from "../../../components/Input";
import Button from "../../../components/Button";
// styles
import { StyleSheet, Text, View, Alert } from "react-native";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("test@test.com");
  const [password, setPassword] = useState<string>("111111");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("111111");

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

export default SignUp;
