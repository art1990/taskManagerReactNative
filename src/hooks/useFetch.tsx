// react
import React, { useState, useEffect } from "react";

export const useFetch = (apiFunc, option, serializer = (data) => data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await apiFunc(option);
        const serializedResponse = serializer(res);
        setResponse(serializedResponse);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return { response, error, isLoading };
};
