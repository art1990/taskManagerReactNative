// react
import React, { useState, useEffect } from "react";
// hook
import { useAuth } from "./useAuth";
// firestore
import { db, firebaseApp } from "../fireBase";

export const useFirestore = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    tasksListCol: null,
    userDoc: null,
    weekCol: null,
  });
};
