import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { auth } from "../config/firebase";
import Cookies from "js-cookie";

import {
  setAuthStatus,
  selectCurrentUser,
  getAuthProvider,
  selectAuthProvider,
} from "../features/authSlice";

function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const provider = useAppSelector(selectAuthProvider);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      dispatch(setAuthStatus(currentUser?.toJSON()));
      dispatch(getAuthProvider(currentUser?.providerData[0].providerId));
      if (currentUser === null) {
        Cookies.remove("token");
      } else {
        const token = await currentUser.getIdToken(true);
        Cookies.set("token", `Bearer ${token}`, { expires: 1 });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return { user, provider };
}

export default useAuth;
