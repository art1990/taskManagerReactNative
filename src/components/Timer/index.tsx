// react
import React, { useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
// date
import { fromUnixTime, lightFormat, getUnixTime } from "date-fns";
// utils
import { getUTCDate, formatToUTCTime } from "../../utils/date";

interface Timer {
  startTime: number;
}

const Timer: React.FC<Timer> = ({ startTime }) => {
  const [currentTime, setCurrentTime] = useState<number>(
    getUnixTime(new Date())
  );

  useEffect(() => {
    let timer;
    if (startTime) {
      timer = setInterval(() => {
        setCurrentTime(currentTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [startTime, currentTime]);

  const time = useMemo(
    () =>
      (() => {
        return formatToUTCTime(currentTime - startTime);
      })(),
    [startTime, currentTime]
  );

  return (
    <View>
      <Text>{time}</Text>
    </View>
  );
};

export default Timer;
