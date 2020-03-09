// react
import React, { useEffect } from "react";
import { View, Text } from "react-native";
// hooks
import { useAuth } from "../../hooks/useAuth";
// db
import { db } from "../../db";

export default () => {
  const { user } = useAuth();

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(res => console.log(res.data()))
      .catch(err => console.log(err));
  }, []);

  return (
    <View>
      <Text>Helloo world</Text>
    </View>
  );
};
