// react
import React from "react";
// navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// screens
import Statistic from "../screens/Statistic";
import Calendar from "../screens/Calendar";
// stack screnn
import TaskStackScreen from "./TaskStackScreen";
// constants
import { Routes } from "./routes";

// statistic stack
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
export default TabsScreen;
