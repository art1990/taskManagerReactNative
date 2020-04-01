// react
import react, { useState, useEffect } from "react";
// firebase
import firebase from "firebase";

interface IAuth {
  initializing: boolean;
  user: firebase.User;
}

export const useAuth = (): IAuth => {
  const [auth, setAuth] = useState(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user };
  });

  const onChange = user => {
    setAuth({ initializing: false, user });
  };

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return auth;
};
