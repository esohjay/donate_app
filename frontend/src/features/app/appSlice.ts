// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface AppState {
  isLoginView: boolean;
}

// Define the initial state using that type
const initialState: AppState = {
  isLoginView: true,
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeView: (state) => {
      state.isLoginView = !state.isLoginView;
    },
  },
});

export const { changeView } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectViewState = (state: RootState) => state.app.isLoginView;
export default appSlice.reducer;
