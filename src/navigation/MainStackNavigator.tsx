// react
import React, { useEffect } from "react";
// navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// screens
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import TasksList from "../screens/TasksList";
import CreateTask from "../screens/CreateTask";
import AddTags from "../screens/AddTags";
import Filters from "../screens/Filters";
import Statistic from "../screens/Statistic";
import Calendar from "../screens/Calendar";
// hooks
import { useAuth } from "../hooks/useAuth";
// constants
import {
  LOGIN,
  SIGNUP,
  ADD_TAGS,
  CALENDAR,
  CREATE_TASK,
  FILTERS,
  STATISTIC,
  TASKS_LIST,
  CALENDAR_TAB,
  STATISTIC_TAB,
  TASK_TAB
} from "./routesConstants";

// auth stack
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName={LOGIN}>
    <AuthStack.Screen name={LOGIN} component={Login} />
    <AuthStack.Screen name={SIGNUP} component={SignUp} />
  </AuthStack.Navigator>
);

// task stack
const TaskStack = createStackNavigator();

const TaskStackScreen = () => (
  <TaskStack.Navigator
    initialRouteName={TASKS_LIST}
    screenOptions={{
      gestureEnabled: true
    }}
  >
    <TaskStack.Screen name={TASKS_LIST} component={TasksList} />
    <TaskStack.Screen name={CREATE_TASK} component={CreateTask} />
    <TaskStack.Screen name={ADD_TAGS} component={AddTags} />
    <TaskStack.Screen name={FILTERS} component={Filters} />
  </TaskStack.Navigator>
);

// static stack
const StatisticStack = createStackNavigator();

const StatisticStackScreen = () => (
  <StatisticStack.Navigator>
    <StatisticStack.Screen name={STATISTIC} component={Statistic} />
  </StatisticStack.Navigator>
);

// calendar stack
const CalendarStack = createStackNavigator();

const CalendarStackScreen = () => (
  <CalendarStack.Navigator>
    <CalendarStack.Screen name={CALENDAR} component={Calendar} />
  </CalendarStack.Navigator>
);

// tabs stack
const Tabs = createBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name={TASK_TAB} component={TaskStackScreen} />
    <Tabs.Screen name={STATISTIC_TAB} component={StatisticStackScreen} />
    <Tabs.Screen name={CALENDAR_TAB} component={CalendarStackScreen} />
  </Tabs.Navigator>
);

// root stack
const MainStackNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {!user ? <AuthStackScreen /> : <TabsScreen />}
    </NavigationContainer>
  );
};

export default MainStackNavigator;
