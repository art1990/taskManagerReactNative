// react
import React, { useEffect, useState } from "react";
// components
import Input from "./src/components/Input";
import Button from "./src/components/Button";
// firebase
import * as firebase from "firebase/app";
// styles
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAG1lI3IFb1rBbyrXQxua8mna7eFNqfdHQ",
      authDomain: "task-manager-react-native.web.app"
    };

    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
  }, []);

  return (
    <View style={styles.container}>
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
      <Button>Sign up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
