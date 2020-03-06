// react
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
// screens
import Input from "../../../components/Input";
import Button from "../../../components/Button";
// firebase
import * as firebase from "firebase";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch(error => Alert.alert(error.message));
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
