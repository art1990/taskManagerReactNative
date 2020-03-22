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
// assets
import AlarmIcon from "../assets/img/icons/alarm.svg";
import CalendarIcon from "../assets/img/icons/calendar.svg";
import StatisticIcon from "../assets/img/icons/statistic.svg";

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
  <Tabs.Navigator
    tabBarOptions={{ showLabel: false }}
    screenOptions={({ route }) => ({
      gestureEnabled: true,
      tabBarIcon: ({ focused }) => {
        const color = focused ? "black" : "#979797";
        switch (route.name) {
          case Routes.TASK_TAB:
            return <AlarmIcon width={22} height={22} fill={color} />;
          case Routes.STATISTIC_TAB:
            return <StatisticIcon width={22} height={22} fill={color} />;
          case Routes.CALENDAR_TAB:
            return <CalendarIcon width={22} height={22} fill={color} />;
        }
      }
    })}
  >
    <Tabs.Screen name={Routes.TASK_TAB} component={TaskStackScreen} />
    <Tabs.Screen name={Routes.STATISTIC_TAB} component={StatisticStackScreen} />
    <Tabs.Screen name={Routes.CALENDAR_TAB} component={CalendarStackScreen} />
  </Tabs.Navigator>
);
export default TabsScreen;
