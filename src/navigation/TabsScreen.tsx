// react
import React from "react";
import { StyleSheet } from "react-native";
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
import { Colors } from "../assets/styles/constants";
// assets
import AlarmIcon from "../assets/img/icons/alarm.svg";
import CalendarIcon from "../assets/img/icons/calendar.svg";
import StatisticIcon from "../assets/img/icons/statistic.svg";
// styles
import { headerStyle } from "./styles";

// statistic stack
const StatisticStack = createStackNavigator();

const StatisticStackScreen = () => (
  <StatisticStack.Navigator screenOptions={{ headerStyle }}>
    <StatisticStack.Screen name={Routes.STATISTIC} component={Statistic} />
  </StatisticStack.Navigator>
);

// calendar stack
const CalendarStack = createStackNavigator();

const CalendarStackScreen = () => (
  <CalendarStack.Navigator screenOptions={{ headerStyle }}>
    <CalendarStack.Screen name={Routes.CALENDAR} component={Calendar} />
  </CalendarStack.Navigator>
);

// tabs stack
const Tabs = createBottomTabNavigator();
const size = 26;

const TabsScreen = () => (
  <Tabs.Navigator
    tabBarOptions={{
      showLabel: false,
      style: styles.taBarContainer,
      keyboardHidesTabBar: true,
    }}
    screenOptions={({ route }) => ({
      gestureEnabled: true,
      tabBarIcon: ({ focused }) => {
        const color = focused ? Colors.activeTab : Colors.tab;
        switch (route.name) {
          case Routes.TASK_TAB:
            return <AlarmIcon width={size} height={size} fill={color} />;
          case Routes.STATISTIC_TAB:
            return <StatisticIcon width={size} height={size} fill={color} />;
          case Routes.CALENDAR_TAB:
            return <CalendarIcon width={size} height={size} fill={color} />;
        }
      },
    })}
  >
    <Tabs.Screen name={Routes.TASK_TAB} component={TaskStackScreen} />
    <Tabs.Screen name={Routes.STATISTIC_TAB} component={StatisticStackScreen} />
    <Tabs.Screen name={Routes.CALENDAR_TAB} component={CalendarStackScreen} />
  </Tabs.Navigator>
);

const styles = StyleSheet.create({
  taBarContainer: {
    backgroundColor: Colors.tabBarBGColor,
    height: 70,
  },
});
export default TabsScreen;
