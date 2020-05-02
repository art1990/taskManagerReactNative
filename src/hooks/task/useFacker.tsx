// react
import React from "react";
// hooks
import { useFirestore } from "../db/useFirestore";
// api
import { generateTasksApi } from "../../services/api/faker";
export default () => {
  const firestore = useFirestore();

  const generateTasks = () => {
    generateTasksApi(firestore);
  };

  return { generateTasks };
};
