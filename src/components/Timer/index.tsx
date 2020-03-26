// react
import React, { useState, useEffect, useMemo } from "react";
import { Text, StyleSheet } from "react-native";
// date
import { getUnixTime } from "date-fns";
// utils
import { formatToUTCTime } from "../../utils/date";

interface Timer {
  startTime: number;
  duration: number;
}

const Timer: React.FC<Timer> = ({ startTime, duration }) => {
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

  const delta = duration || 0;

  const time = useMemo(
    () =>
      (() => {
        return formatToUTCTime(currentTime - startTime + delta);
      })(),
    [startTime, currentTime]
  );

  return <Text style={styles.text}>{time} h</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 21
  }
});

export default Timer;
