// react
import React, { useState, useEffect } from "react";
// hook
import { useAuth } from "../useAuth";
// firestore
import { db } from "../../fireBase";

export const useFirestore = () => {
  const { user } = useAuth();

  if (!user) return null;

  const userDoc = db.collection("users").doc(user.uid);
  const tasksListCol = userDoc?.collection("tasksList");
  const weeksCol = userDoc?.collection("weeks");
  return { userDoc, tasksListCol, weeksCol, user };
};
