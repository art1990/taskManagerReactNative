// react
import React, { useRef, useEffect } from "react";
export const useMemoCompare = (value, compare) => {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;

  // Pass previous and new value to compare function
  const isEqual = compare(previous, value);

  // If not equal update previous to new value (for next render)
  // and then return new new value below.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = value;
    }
  });

  return isEqual ? previous : value;
};
