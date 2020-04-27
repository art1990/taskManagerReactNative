//react
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// carusel
import Carousel from "react-native-snap-carousel";
// colors
import { Colors } from "../../../assets/styles/constants";

const data = [
  { title: "aaaaaa" },
  { title: "bbbbbbbb" },
  { title: "cc" },
  { title: "cc" },
  { title: "cc" },
].reverse();

const CaruselTask = ({ style, hour }) => {
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          styles.item,
          index === 2 && { height: 200, marginTop: 50 },
          index === 1 && { height: 100 },
        ]}
      >
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.hourLabel}>{hour}</Text>
      <Carousel
        slideStyle={{ alignSelf: "flex-start" }}
        // containerCustomStyle={}
        // firstItem={4}
        layout={"stack"}
        layoutCardOffset={6}
        data={data}
        renderItem={renderItem}
        sliderWidth={290}
        itemWidth={250}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  item: {
    backgroundColor: Colors.calendarTaskBgColor,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  hourLabel: {
    flex: 0,
    marginBottom: 25,
    marginLeft: 6,
    color: Colors.calendarLabel,
  },
});

export default CaruselTask;
