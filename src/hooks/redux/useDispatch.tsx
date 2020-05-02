// react
import React, { useCallback } from "react";
// redux
import { useDispatch } from "react-redux";
// hook
import { useFirestore } from "../db/useFirestore";

export default () => {
  const firebase = useFirestore();
  const reduxDispatch = useDispatch();

  const dispatch = useCallback(
    (action, api = undefined, params = {}) => {
      reduxDispatch(
        api
          ? action.request({
              api: { api, firebase, reduxAction: action },
              ...params,
            })
          : action
      );
    },
    [firebase, reduxDispatch]
  );

  return { dispatch };
};
