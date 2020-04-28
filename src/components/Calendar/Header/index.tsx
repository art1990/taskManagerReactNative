// react
import React, { useState, useCallback } from "react";
// react calendar
import { WeekCalendar } from "react-native-calendars";
// type
import { IUseCalendarReturn } from "../../../hooks/useCalendar";

interface IHeaderProps {
  date: IUseCalendarReturn["date"];
  setDate: IUseCalendarReturn["setDate"];
}

const Header: React.FC<IHeaderProps> = ({ date, setDate }) => {
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
