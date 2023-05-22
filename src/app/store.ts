import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/user/userSlice";
import integrationSlice from "../features/integrations/integrationSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    integration: integrationSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
