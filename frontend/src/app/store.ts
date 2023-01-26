import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
