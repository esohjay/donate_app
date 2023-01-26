import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { auth } from "../config/firebase";
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setAuthStatus(currentUser?.toJSON()));
      dispatch(getAuthProvider(currentUser?.providerData[0].providerId));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return { user, provider };
}

export default useAuth;
