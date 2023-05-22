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
  // setToken,
} from "../features/authSlice";

function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const provider = useAppSelector(selectAuthProvider);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser === null) {
        Cookies.remove("token");
        dispatch(setAuthStatus(null));
      } else {
        dispatch(
          setAuthStatus({
            fullname: currentUser?.displayName,
            email: currentUser?.email,
            uid: currentUser?.uid,
            phoneNumber: currentUser?.phoneNumber,
            photoUrl: currentUser?.photoURL,
          })
        );
        dispatch(getAuthProvider(currentUser?.providerData[0].providerId));
        // const token = await currentUser.getIdToken(true);
        // Cookies.set("token", `Bearer ${token}`, { expires: 1 });
        // dispatch(setToken(token));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return { user, provider };
}

export default useAuth;
