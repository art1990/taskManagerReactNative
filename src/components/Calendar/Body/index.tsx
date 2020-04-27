// react
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
// components
import TimeLabels from "./TimeLabels";
import CaruselTask from "./CaruselTask";
// colors
import { Colors } from "../../../assets/styles/constants";
// utils
import { generateHourList } from "../../../utils/time";

const hourList = generateHourList();

const Body = () => {
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.tasksContainer}></View> */}
      <CaruselTask hour="00:00" style={{ height: 60 * 12 }} />
      <CaruselTask
        hour="02:00"
        style={{ position: "absolute", top: 60, left: 0 }}
      />
      <CaruselTask
        hour="04:00"
        style={{ position: "absolute", top: 180, left: 0 }}
      />
      <CaruselTask
        hour="06:00"
        style={{ position: "absolute", top: 120, left: 0 }}
      />
      <CaruselTask
        hour="8:00"
        style={{ position: "absolute", top: 240, left: 0 }}
      />
      <CaruselTask
        hour="10:00"
        style={{ position: "absolute", top: 300, left: 0 }}
      />
      <CaruselTask
        hour="12:00"
        style={{ position: "absolute", top: 360, left: 0 }}
      />
      <CaruselTask
        hour="14:00"
        style={{ position: "absolute", top: 420, left: 0 }}
      />
      <CaruselTask
        hour="16:00"
        style={{ position: "absolute", top: 480, left: 0 }}
      />
      <CaruselTask
        hour="18:00"
        style={{ position: "absolute", top: 540, left: 0 }}
      />
      <CaruselTask
        hour="20:00"
        style={{ position: "absolute", top: 600, left: 0 }}
      />
      {/* <TimeLabels /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 28,
    marginVertical: 10,
    borderLeftWidth: 1,
    borderColor: Colors.calendarLabel,

    // zIndex: 0,
  },
  tasksContainer: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
    // height: "100%",
    width: 200,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default Body;
