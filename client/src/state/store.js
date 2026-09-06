// using redux toolkit for minimal boilerplate
import counterReducer from "./counter/counterSlice";
import alertReducer from "./alert/alertSlice";
import authReducer from "./auth/authSlice";

import { configureStore } from "@reduxjs/toolkit";
import { profileApiSlice } from "./profiles/profileApiSlice";
import { postApiSlice } from "./post/postApiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer,
    auth: authReducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
  },
  // required for caching and all the benefits of RTK Query
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      profileApiSlice.middleware,
      postApiSlice.middleware,
    );
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
