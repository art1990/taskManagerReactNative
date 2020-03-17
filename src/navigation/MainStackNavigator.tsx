// react
import React from "react";
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
import { Routes } from "./routes";

// auth stack
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName={Routes.LOGIN}>
    <AuthStack.Screen name={Routes.LOGIN} component={Login} />
    <AuthStack.Screen name={Routes.SIGNUP} component={SignUp} />
  </AuthStack.Navigator>
);

// task stack
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

// static stack
const StatisticStack = createStackNavigator();

const StatisticStackScreen = () => (
  <StatisticStack.Navigator>
    <StatisticStack.Screen name={Routes.STATISTIC} component={Statistic} />
  </StatisticStack.Navigator>
);

// calendar stack
const CalendarStack = createStackNavigator();

const CalendarStackScreen = () => (
  <CalendarStack.Navigator>
    <CalendarStack.Screen name={Routes.CALENDAR} component={Calendar} />
  </CalendarStack.Navigator>
);

// tabs stack
const Tabs = createBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name={Routes.TASK_TAB} component={TaskStackScreen} />
    <Tabs.Screen name={Routes.STATISTIC_TAB} component={StatisticStackScreen} />
    <Tabs.Screen name={Routes.CALENDAR_TAB} component={CalendarStackScreen} />
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
