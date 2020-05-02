// react
import React from "react";
// navigation
import { createStackNavigator } from "@react-navigation/stack";
// screens
import TasksList from "../screens/TasksList";
import CreateTask from "../screens/CreateTask";
import EditTask from "../screens/EditTask";
import ViewTask from "../screens/ViewTask";
import AddTags from "../screens/AddTags";
import Filters from "../screens/Filters";
// constants
import { Routes } from "./routes";
// styles
import { headerStyle } from "./styles";

const TaskStack = createStackNavigator();

const TaskStackScreen = () => (
  <TaskStack.Navigator
    initialRouteName={Routes.TASKS_LIST}
    screenOptions={{
      headerStyle,
      gestureEnabled: true,
    }}
  >
    <TaskStack.Screen name={Routes.TASKS_LIST} component={TasksList} />
    <TaskStack.Screen name={Routes.FILTERS} component={Filters} />
    <TaskStack.Screen name={Routes.EDIT_TASK} component={EditTask} />
    <TaskStack.Screen name={Routes.VIEW_TASK} component={ViewTask} />
    <TaskStack.Screen name={Routes.CREATE_TASK} component={CreateTask} />
    <TaskStack.Screen name={Routes.ADD_TAGS} component={AddTags} />
  </TaskStack.Navigator>
);

export default TaskStackScreen;
