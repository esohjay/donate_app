import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import authSlice from "../features/authSlice";
import { appApi } from "../api";

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    [appApi.reducerPath]: appApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
