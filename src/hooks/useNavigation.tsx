// react
import React from "react";
// react-navigation
import {
  useRoute,
  useNavigation,
  NavigationProp,
  NavigationState,
} from "@react-navigation/native";
// interface
import { ITaskState } from "../redux/task";

interface IUseNavigation {
  id: ITaskState["taskData"]["id"];
  navigation: NavigationProp<
    Record<string, object>,
    string,
    NavigationState,
    {},
    {}
  >;
  params: {};
}

export default (): IUseNavigation => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;
  const id = params?.id;

  return { navigation, id, params };
};
