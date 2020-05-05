// react
import React, { useEffect, useState } from "react";
// hook
import { useFirestore } from "./useFirestore";
import { useMemoCompare } from "../useMemoCompare";
// utils
import equal from "equals";

export default (action, depth, unmount = undefined) => {
  const [renderNum, setRenderNum] = useState(0);

  const memoDepth = useMemoCompare(depth, (prevDepth) =>
    equal(depth, prevDepth)
  );
  const { tasksListCol } = useFirestore();

  useEffect(() => {
    const unsubscribe = tasksListCol.onSnapshot(() => {
      action();
    });
    setRenderNum(renderNum + 1);
    return () => {
      unsubscribe();
      unmount && unmount();
    };
  }, []);

  useEffect(() => {
    if (renderNum === 0 || !depth) return;
    action();
  }, [memoDepth]);
};
