// react
import React, { useEffect, useRef } from "react";
import { de } from "date-fns/locale";

export default () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted.current;
};
