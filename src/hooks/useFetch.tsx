// react
import React, { useState, useEffect, useMemo } from "react";
// hook
import { useMemoCompare } from "../hooks/useMemoCompare";
// utils
import equal from "equals";

export const useFetch = (apiFunc, option, serializer = (data) => data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const memoOption = useMemoCompare(
    option,
    (prevOption) => prevOption && equal(option, prevOption)
  );

  useEffect(() => {
    console.log("effect");
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await apiFunc(memoOption);
        const serializedResponse = serializer(res);
        setResponse(serializedResponse);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [memoOption]);
  return { response, error, isLoading };
};