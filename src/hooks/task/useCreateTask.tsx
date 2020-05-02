// react
import React from "react";
// redux
import { create } from "../../redux/task";
// react-navigation
import { useNavigation } from "@react-navigation/native";
// hooks
import useDispatch from "../redux/useDispatch";
// api
import { createTaskApi } from "../../services/api/task";

export default () => {
  const { dispatch } = useDispatch();
  const navigation = useNavigation();

  const onCreatePress = (data) => {
    dispatch(create, createTaskApi, { ...data, navigation });
  };

  return { onCreatePress };
};
