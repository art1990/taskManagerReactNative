// react
import React, { useState, useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// hook
import { useFetch } from "../hooks/useFetch";
// api
import { getWeekDataApi } from "../services/api";
// date-fns
import { getUnixTime } from "date-fns";

export const useCalendar = () => {
  const [date, setDate] = useState({
    string: "2020-04-25",
    number: 1587632990375,
  });

  const { response, error, isLoading } = useFetch(getWeekDataApi, {
    currentPerDay: date.number,
  });

  return { calendarTask: response, error, setDate, date, isLoading };
};
