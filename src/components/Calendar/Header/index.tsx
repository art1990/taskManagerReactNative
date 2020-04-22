// react
import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
// components
import Spinner from "../../Spinner";
// react calendar
import { WeekCalendar } from "react-native-calendars";
// hooks
import { useCalendar } from "../../../hooks/useCalendar";

interface IHeaderProps {}

const Header = () => {
  const { calendarTask, setDate, date } = useCalendar();

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
      {!calendarTask && <Spinner />}
    </>
  );
};

export default Header;
