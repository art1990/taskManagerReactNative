// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// componets
import Title from "../../components/Title";
import Calendar from "../../components/Calendar";

export default () => {
  return (
    <View>
      <Title text="Calendar" />
      <Calendar />
    </View>
  );
};
