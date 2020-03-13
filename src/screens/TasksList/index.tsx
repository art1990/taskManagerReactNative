// react
import React, { useEffect } from "react";
import { View, Text } from "react-native";
// redux
import { useDispatch } from "react-redux";
import { logout } from "../../domains/user";
// components
import Button from "../../components/Button";
// hooks
import { useAuth } from "../../hooks/useAuth";
// db
import { db } from "../../db";

export default () => {
  const { user } = useAuth();

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logout.run());
  };

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(res => console.log(res.data()))
      .catch(err => console.log(err));
  }, []);

  return (
    <View>
      <Text>Task List</Text>
      {user && <Button onPress={onLogOut}>LogOut</Button>}
    </View>
  );
};
