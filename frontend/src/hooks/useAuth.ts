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
  getToken,
  selectToken,
} from "../features/authSlice";

function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const provider = useAppSelector(selectAuthProvider);
  const newToken = useAppSelector(selectToken);
  auth.currentUser
    ?.getIdTokenResult()
    .then((token) => {
      // if (!!token.claims.admin) {
      //   dispatch(setAdminStatus());
      // }
      const tokenExpired = Date.now() > Date.parse(token.expirationTime);
      console.log(tokenExpired);
      console.log(Date.now());
      console.log(new Date(Date.now()));
      console.log(new Date(token.expirationTime));
      console.log(Date.parse(token.expirationTime));
      console.log(token.token);
      Cookies.set("token", `Bearer ${token.token}`, { expires: 1 });
      if (tokenExpired) {
        dispatch(getToken());
        Cookies.set("token", `Bearer ${newToken}`, { expires: 1 });
        console.log("doneeee");
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
