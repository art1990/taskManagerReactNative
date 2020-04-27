// react
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// colors
import { Colors } from "../../../assets/styles/constants";
// utils
import { generateHourList } from "../../../utils/time";

const time = generateHourList();

const TimeLabels = () => (
  <>
    {time.map((el, i) => (
      <Text
        key={el}
        style={[styles.label, i === time.length - 1 && { marginBottom: 0 }]}
      >
        {el}
      </Text>
    ))}
  </>
);

const styles = StyleSheet.create({
  label: {
    color: Colors.calendarLabel,
    marginBottom: 25,
    marginLeft: 6,
  },
});

export default TimeLabels;
