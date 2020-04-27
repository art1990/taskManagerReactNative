// react
import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
// react calendar
import { WeekCalendar } from "react-native-calendars";

interface IHeaderProps {}

const Header = ({ date, setDate }) => {
  const selectedStyle = {
    selected: true,
    marked: true,
    selectedColor: "grey",
  };

  const onDayPress = useCallback(
    ({ dateString, timestamp }) => {
      setDate({ string: dateString, number: timestamp });
    },
    [setDate]
  );

  return (
    <>
      <WeekCalendar
        context={{ date: date.string }}
        markedDates={{ [date.string]: selectedStyle }}
        onDayPress={onDayPress}
      />
    </>
  );
};

export default Header;
