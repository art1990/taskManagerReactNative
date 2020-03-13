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

// auth stack
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);

// task stack
const TaskStack = createStackNavigator();

const TaskStackScreen = () => (
  <TaskStack.Navigator
    initialRouteName="TasksList"
    screenOptions={{
      gestureEnabled: true
    }}
  >
    <TaskStack.Screen name="Tasks list" component={TasksList} />
    <TaskStack.Screen name="Create new task" component={CreateTask} />
    <TaskStack.Screen name="Add tags to task" component={AddTags} />
    <TaskStack.Screen name="Filters" component={Filters} />
  </TaskStack.Navigator>
);

// static stack
const StatisticStack = createStackNavigator();

const StatisticStackScreen = () => (
  <StatisticStack.Navigator>
    <StatisticStack.Screen name="Statistic" component={Statistic} />
  </StatisticStack.Navigator>
);

// calendar stack
const CalendarStack = createStackNavigator();

const CalendarStackScreen = () => (
  <CalendarStack.Navigator>
    <CalendarStack.Screen name="Calendar" component={Calendar} />
  </CalendarStack.Navigator>
);

// tabs stack
const Tabs = createBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="task" component={TaskStackScreen} />
    <Tabs.Screen name="statistic" component={StatisticStackScreen} />
    <Tabs.Screen name="calendar" component={CalendarStackScreen} />
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
