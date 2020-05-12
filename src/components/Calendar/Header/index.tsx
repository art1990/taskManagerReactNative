// react
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
// react calendar
// @ts-ignore
import { WeekCalendar, CalendarProvider } from "react-native-calendars";
// type
import { IUseCalendarReturn } from "../../../hooks/useCalendar";

const Header: React.FC<Pick<IUseCalendarReturn, "date" | "setDate">> = ({
  date,
  setDate,
}) => {
  const selectedStyle = {
    selected: true,
    marked: true,
    selectedColor: "grey",
  };

  const onDateChanged = useCallback(
    (date) => {
      setDate(date);
    },
    [setDate]
  );

  return (
    <CalendarProvider
      date={date}
      style={styles.container}
      onDateChanged={onDateChanged}
    >
      <WeekCalendar markedDates={{ [date]: selectedStyle }} />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({ container: { flex: 0 } });

export default Header;
