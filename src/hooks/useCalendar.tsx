// react
import React, { useState, useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// api
import { getWeekDataApi } from "../services/api";
// date-fns
import { getUnixTime } from "date-fns";

export const useCalendar = () => {
  const [calendarTask, setCalendarTask] = useState(null);
  const [date, setDate] = useState({
    string: "2020-04-25",
    number: Date.now(),
  });

  useEffect(() => {
    setCalendarTask(null);
    getWeekDataApi({ currentPerDay: date.number }).then((res) =>
      setCalendarTask(res)
    );
  }, [date]);

  return { calendarTask, setDate, date };
};
