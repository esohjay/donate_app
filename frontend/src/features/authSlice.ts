import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import axios from "axios";
import { SignupInputs } from "../type";
import Cookies from "js-cookie";

//fireabse
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface Address {
  address: string;
  coordinates: string;
  placeId: string;
}
interface FirebaseUser {
  fullname: string | null | undefined;
  email: string | null | undefined;
  phoneNumber?: string | null;
  photoUrl?: string | null;
  uid: string | undefined;
}
// Define a type for the slice state
interface AuthState {
  user: object | null;
  firebaseUser: object | null;
  status: string;
  currentUser: FirebaseUser | null;
  authProvider: string | undefined;
  coordinates: Address[] | null;
  error: object | null;
  wktCoordinates: string | null;
  token: string | undefined;
}

interface UserDetails {
  email: string;
  password: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  firebaseUser: null,
  status: "idle",
  currentUser: null,
  authProvider: undefined,
  coordinates: null,
  error: null,
  wktCoordinates: null,
  token: undefined,
};

//email and password sign up
export const signUpWithEmailAndPassword = createAsyncThunk(
  "auth/signUpWithEmailAndPassword",
  async (info: SignupInputs, { dispatch }) => {
    const user = await createUserWithEmailAndPassword(
      auth,
      info.email,
      info.password
    );
    const token = await user.user.getIdToken();
    dispatch(setToken(`Bearer ${token}`));
    Cookies.set("token", `Bearer ${token}`, { expires: 1 });

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users`,
      {
        ...info,
        uid: user.user.uid,
      },
      {
        headers: {
          // Authorization: authToken,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  }
);

//Email and password sign in
export const logInWithEmailAndPassword = createAsyncThunk(
  "auth/logInWithEmailAndPassword",
  async (info: UserDetails, { dispatch }) => {
    const user = await signInWithEmailAndPassword(
      auth,
      info.email,
      info.password
    );
    const token = await user.user.getIdToken();
    dispatch(setToken(`Bearer ${token}`));
    Cookies.set("token", `Bearer ${token}`, { expires: 1 });

    return {
      fullname: user?.user?.displayName,
      email: user?.user?.email,
      uid: user?.user?.uid,
      phoneNumber: user?.user?.phoneNumber,
      photoUrl: user?.user?.photoURL,
    };
  }
);
//Email and password sign in
export const getToken = createAsyncThunk("auth/getToken", async () => {
  const token = await auth?.currentUser?.getIdToken(true);
  Cookies.set("token", `Bearer ${token}`, { expires: 1 });
  return token;
});
//Logout
export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await signOut(auth);
    Cookies.remove("token");
    dispatch(setAuthStatus(null));
    return null;
  }
);
//google authentication
export const authenticateWithGoogle = createAsyncThunk(
  "auth/authenticateWithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //  const credential = GoogleAuthProvider.credentialFromResult(result);
    //  const token = credential?.accessToken;
    // The signed-in user info.
    return result.user.toJSON();
  }
);

//facebook authentication
export const authenticateWithFacebook = createAsyncThunk(
  "auth/authenticateWithFacebook",
  async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //  const credential = GoogleAuthProvider.credentialFromResult(result);
    //  const token = credential?.accessToken;
    // The signed-in user info.
    return result.user.toJSON();
  }
);

//twitter authentication
export const authenticateWithTwitter = createAsyncThunk(
  "auth/authenticateWithTwitter",
  async () => {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //  const credential = GoogleAuthProvider.credentialFromResult(result);
    //  const token = credential?.accessToken;
    // The signed-in user info.
    return result.user.toJSON();
  }
);

//get cordinates from address
export const getCoordinatesFromAddress = createAsyncThunk(
  "auth/getCoordinatesFromAddress",
  async (address: string) => {
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/search`,
      {
        params: {
          text: address,
          format: "json",
          apiKey: process.env.REACT_APP_GEOAPIFY_APIKEY,
          limit: 10,
        },
      }
    );
    let locations: Array<Address> = [];
    for (let location of data.results) {
      const coords = `POINT(${location.lon} ${location.lat})`;
      const address: string = location.formatted;
      const placeId: string = location.place_id;
      locations.push({
        address,
        coordinates: coords,
        placeId,
      });
    }

    return locations;
  }
);

//auth slice
export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.currentUser = action.payload;
    },
    getAuthProvider: (state, action: PayloadAction<string | undefined>) => {
      state.authProvider = action.payload;
    },
    setWktCoordinates: (state, action: PayloadAction<string | null>) => {
      state.wktCoordinates = action.payload;
    },
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    //sign up
    builder.addCase(
      signUpWithEmailAndPassword.fulfilled,
      (state: AuthState, action) => {
        state.user = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      signUpWithEmailAndPassword.rejected,
      (state: AuthState, action) => {
        state.error = action.error;
        state.status = "failed";
      }
    );
    builder.addCase(
      signUpWithEmailAndPassword.pending,
      (state: AuthState, action) => {
        state.status = "pending";
      }
    );
    //login
    //sign up
    builder.addCase(getToken.fulfilled, (state: AuthState, action) => {
      state.token = action.payload;
      state.status = "success";
    });
    builder.addCase(getToken.rejected, (state: AuthState, action) => {
      state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(getToken.pending, (state: AuthState, action) => {
      state.status = "pending";
    });
    //login
    builder.addCase(
      logInWithEmailAndPassword.fulfilled,
      (state: AuthState, action) => {
        state.user = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      logInWithEmailAndPassword.rejected,
      (state: AuthState, action) => {
        state.error = action.error;
        state.status = "failed";
      }
    );
    builder.addCase(
      logInWithEmailAndPassword.pending,
      (state: AuthState, action) => {
        state.status = "pending";
      }
    );
    // //logout
    // builder.addCase(logOut.fulfilled, (state: AuthState, action) => {
    //   state.user = action.payload;
    //   state.currentUser = undefined;
    //   state.status = "success";
    // });
    //google auth
    builder.addCase(
      authenticateWithGoogle.fulfilled,
      (state: AuthState, action) => {
        state.user = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      authenticateWithGoogle.rejected,
      (state: AuthState, action) => {
        state.error = action.error;
        state.status = "failed";
      }
    );
    builder.addCase(
      authenticateWithGoogle.pending,
      (state: AuthState, action) => {
        state.status = "pending";
      }
    );
    //facebook auth
    builder.addCase(
      authenticateWithFacebook.fulfilled,
      (state: AuthState, action) => {
        state.user = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      authenticateWithFacebook.rejected,
      (state: AuthState, action) => {
        state.error = action.error;
        state.status = "failed";
      }
    );
    builder.addCase(
      authenticateWithFacebook.pending,
      (state: AuthState, action) => {
        state.status = "pending";
      }
    );
    //twitter auth
    builder.addCase(
      authenticateWithTwitter.fulfilled,
      (state: AuthState, action) => {
        state.user = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      authenticateWithTwitter.rejected,
      (state: AuthState, action) => {
        state.error = action.error;
        state.status = "failed";
      }
    );
    builder.addCase(
      authenticateWithTwitter.pending,
      (state: AuthState, action) => {
        state.status = "pending";
      }
    );

    //get cordinates from address
    builder.addCase(
      getCoordinatesFromAddress.fulfilled,
      (state: AuthState, action) => {
        state.coordinates = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getCoordinatesFromAddress.rejected,
      (state: AuthState, action) => {
        state.error = action.error;
        state.status = "failed";
      }
    );
    builder.addCase(getCoordinatesFromAddress.pending, (state: AuthState) => {
      state.status = "pending";
    });
  },
});

export const { setAuthStatus, getAuthProvider, setWktCoordinates, setToken } =
  authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user;
export const selectFirebaseUser = (state: RootState) => state.auth.firebaseUser;
export const selectToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthProvider = (state: RootState) => state.auth.authProvider;
export const selectCoordinates = (state: RootState) => state.auth.coordinates;
export const selectWktCoordinates = (state: RootState) =>
  state.auth.wktCoordinates;
export default authSlice.reducer;
