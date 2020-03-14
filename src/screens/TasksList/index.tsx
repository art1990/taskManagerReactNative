// react
import React, { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../domains/user";
import { selectTaskData } from "../../domains/task/selectors";
// components
import Button from "../../components/Button";
import Timer from "../../components/Timer";
// hooks
import { useAuth } from "../../hooks/useAuth";
// constants
import { CREATE_TASK } from "../../navigation/routesConstants";
// db
import { db } from "../../db";

export default ({ navigation }) => {
  const { user } = useAuth();
  const taskData = useSelector(selectTaskData);

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logout.run());
  };

  const toAddTask = () => {
    navigation.navigate(CREATE_TASK);
  };

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(res => res.data())
      .catch(err => console.log(err));
  }, []);

  console.log(taskData);
  const { startTime } = taskData;
  return (
    <View>
      <Text>Task List</Text>
      {user && <Button onPress={onLogOut}>LogOut</Button>}
      {startTime && <Timer startTime={startTime} />}
      <Button onPress={toAddTask}>Add task</Button>
    </View>
  );
};
