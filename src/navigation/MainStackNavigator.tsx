// react
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// screens
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import Main from "../screens/Main";
// hooks
import { useAuth } from "../hooks/useAuth";
// tab navigation
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Test = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused
            ? "ios-information-circle"
            : "ios-information-circle-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "ios-list-box" : "ios-list";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "black"
    }}
  >
    <Tab.Screen name="Home" component={SignUp} />
    <Tab.Screen name="Settings" component={Main} />
  </Tab.Navigator>
);

const MainStackNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={{
          gestureEnabled: true
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <Stack.Screen name="Main" component={Main} />
        )}
      </Stack.Navigator>
      <Stack.Screen name="Test" component={Test} />
    </NavigationContainer>
  );
};

export default MainStackNavigator;
