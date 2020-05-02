// react
import React from "react";
import { Alert } from "react-native";
//redux
import { remove } from "../../redux/task";
// api
import { removeTaskApi } from "../../services/api/task";
// hooks
import useDispatch from "../redux/useDispatch";
import useNavigation from "../useNavigation";

export default () => {
  const { dispatch } = useDispatch();
  const { id, navigation } = useNavigation();

  const onRemovePress = (
    _id?: string,
    isNavigate: boolean = undefined
  ): void => {
    const userNavigate = isNavigate && { navigation };

    const onPress = () =>
      dispatch(remove, removeTaskApi, { id: id || _id, ...userNavigate });

    Alert.alert("Remove task", "Do you want to remove tasks??", [
      { text: "Cansel", style: "cancel" },
      {
        text: "Remove",
        onPress,
      },
    ]);
  };

  return { onRemovePress };
};
