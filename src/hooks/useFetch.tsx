// react
import React, { useState, useEffect } from "react";
// hook
import { useMemoCompare } from "../hooks/useMemoCompare";
import { useFirestore } from "./db/useFirestore";
// utils
import equal from "equals";

export const useFetch = (apiFunc, option, conversion = (data) => data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const firestore = useFirestore();

  const memoOption = useMemoCompare(
    option,
    (prevOption) => prevOption && equal(option, prevOption)
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await apiFunc({ ...memoOption, ...firestore });
      const serializedResponse = conversion(res);
      setResponse(serializedResponse);
    } catch (error) {
      console.log("usefetch error:     ", error);
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [memoOption]);

  return { response, error, isLoading };
};
