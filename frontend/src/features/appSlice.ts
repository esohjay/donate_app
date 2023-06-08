// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface AppState {
  view: "address" | "password-signup" | "social-signup";
  showAddressModal: boolean;
}

// Define the initial state using that type
const initialState: AppState = {
  view: "address",
  showAddressModal: false,
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeView: (
      state,
      action: PayloadAction<"address" | "password-signup" | "social-signup">
    ) => {
      state.view = action.payload;
    },
    setAddressModalView: (state, action: PayloadAction<boolean>) => {
      state.showAddressModal = action.payload;
    },
  },
});

export const { changeView, setAddressModalView } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectViewState = (state: RootState) => state.app.view;
export const selectAddressModalView = (state: RootState) =>
  state.app.showAddressModal;
export default appSlice.reducer;
