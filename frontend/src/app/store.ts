import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import dateReducer from "../features/date/dateSlice";
import chemicalReducer from "../features/chemical/chemicalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    date: dateReducer,
    chemical: chemicalReducer,
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
