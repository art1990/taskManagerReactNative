// react
import React, { useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
// date
import { fromUnixTime, lightFormat } from "date-fns";
// utils
import { getUTCDate } from "../../utils/date";

interface Timer {
  startTime: number;
}

const Timer: React.FC<Timer> = ({ startTime }) => {
  const [currentTime, setCurrentTime] = useState<number>(startTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(currentTime + 1);
    }, 1000);
    if (!startTime) return clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, [currentTime]);

  const time = useMemo(
    () =>
      (() => {
        const date = fromUnixTime(currentTime - startTime);
        return lightFormat(getUTCDate(date), "HH:mm:ss");
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
