//react
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
// components
import IconButton from "../../IconButton";
// carusel
import Carousel from "react-native-snap-carousel";
// colors
import { Colors } from "../../../assets/styles/constants";
// utils
import { formatToUTCTime } from "../../../utils/date";
// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Math.round(Dimensions.get("window").width);

const CaruselTask = ({ style, hour, data, onEditPress }) => {
  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.item, item.style, { minHeight: 30 }]}>
        <Text>{item.title}</Text>
        <Text>{formatToUTCTime(item.duration)}</Text>
        {data?.length > 1 && (
          <MaterialCommunityIcons name="arrow-left-right-bold-outline" />
        )}
        <IconButton
          size={26}
          style={styles.icon}
          icon="edit"
          onPress={() => onEditPress(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.hourLabel}>{hour}</Text>
      <Carousel
        slideStyle={{ alignSelf: "flex-start" }}
        layout={"stack"}
        layoutCardOffset={15}
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth * 0.8}
        itemWidth={screenWidth * 0.7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.calendarTaskBgColor,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 12,
  },
  icon: { width: 26, height: 26 },
  hourLabel: {
    flex: 0,
    marginBottom: 25,
    marginLeft: 6,
    color: Colors.calendarLabel,
  },
});

export default CaruselTask;
