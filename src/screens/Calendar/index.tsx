// react
import React from "react";
import { View, StyleSheet } from "react-native";
// componets
import Title from "../../components/Title";
import Calendar from "../../components/Calendar";

// colors
import { Colors } from "../../assets/styles/constants";

const CalendarScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Title text="Calendar" />
      <Calendar />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default CalendarScreen;
