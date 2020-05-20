// react
import React, { useState, useEffect } from "react";
// hook
import { useAuth } from "../useAuth";
// firestore
import { db, firebase } from "../../fireBase";

type TDoc = firebase.firestore.DocumentData;

interface IuseFirestoreReturn {
  userDoc?: firebase.firestore.DocumentReference<TDoc>;
  tasksListCol?: firebase.firestore.CollectionReference<TDoc>;
  weeksCol?: firebase.firestore.CollectionReference<TDoc>;
  user?: firebase.User;
}

export const useFirestore = (): IuseFirestoreReturn => {
  const { user } = useAuth();

  if (!user) return {};

  const userDoc = db.collection("users").doc(user.uid);
  const tasksListCol = userDoc?.collection("tasksList");
  const weeksCol = userDoc?.collection("weeks");
  return { userDoc, tasksListCol, weeksCol, user };
};
