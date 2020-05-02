// react
import React, { useCallback } from "react";
// react calendar
import { WeekCalendar } from "react-native-calendars";
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
