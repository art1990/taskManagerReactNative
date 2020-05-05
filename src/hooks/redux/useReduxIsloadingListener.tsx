// react
import React, { useState, useEffect } from "react";
// redux
import { useSelector } from "react-redux";
import { selectMeta } from "../../redux/task/selectors";

/*** this hook take setSate useHook function
     and switched swith option in this state ***/

export default (setStateOption) => {
  const { isLoading } = useSelector(selectMeta);

  useEffect(() => {
    if (!isLoading) return;
    setStateOption((prev) => ({ ...prev, sw: !prev.sw }));
  }, [isLoading]);
};
