// react
import React from "react";
import { View } from "react-native";
// navigation
import { createStackNavigator } from "@react-navigation/stack";
// screens
import TasksList from "../screens/TasksList";
import CreateTask from "../screens/CreateTask";
import AddTags from "../screens/AddTags";
import Filters from "../screens/Filters";
// constants
import { Routes } from "./routes";

const TaskStack = createStackNavigator();

const TaskStackScreen = () => (
  <TaskStack.Navigator
    initialRouteName={Routes.TASKS_LIST}
    screenOptions={{
      gestureEnabled: true
    }}
  >
    <TaskStack.Screen name={Routes.TASKS_LIST} component={TasksList} />
    <TaskStack.Screen name={Routes.CREATE_TASK} component={CreateTask} />
    <TaskStack.Screen name={Routes.ADD_TAGS} component={AddTags} />
    <TaskStack.Screen name={Routes.FILTERS} component={Filters} />
  </TaskStack.Navigator>
);

export default TaskStackScreen;
