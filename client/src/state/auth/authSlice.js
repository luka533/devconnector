import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeAlert, setAlert } from "../alert/alertSlice";
import { profileApiSlice } from "../profiles/profileApiSlice";

// since setting the httpOnly Cookie and getting the user is not really fetching the data but rather a business action
// for profiles etc we will use RTK Query since we need the

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authLogoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    const res = await fetch("/api/users/logout");

    const data = await res.json();
    const id = crypto.randomUUID();

    dispatch(setAlert({ msg: data.message, type: data.status, id }));
    setTimeout(() => dispatch(removeAlert(id)), 5000);

    dispatch(profileApiSlice.util.resetApiState());

    return data.message;
  },
);

export const authRegisterAsync = createAsyncThunk(
  "auth/register",
  async (postData, { dispatch, rejectWithValue }) => {
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(postData),
    });

    const data = await res.json();
    const id = crypto.randomUUID();

    if (res.ok) {
      dispatch(
        setAlert({ msg: "Registered successfully!", type: "success", id }),
      );
      setTimeout(() => dispatch(removeAlert(id)), 5000);

      return data.data.user;
    }

    dispatch(setAlert({ msg: data.message, type: "danger", id }));
    setTimeout(() => dispatch(removeAlert(id)), 5000);

    return rejectWithValue(data.message);
  },
);

export const authLoginAsync = createAsyncThunk(
  "auth/login",
  async (postData, { dispatch, rejectWithValue }) => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(postData),
    });

    const data = await res.json();
    const id = crypto.randomUUID();

    if (res.ok) {
      dispatch(
        setAlert({ msg: "Logged in successfully!", type: "success", id }),
      );
      setTimeout(() => dispatch(removeAlert(id)), 5000);

      return data.data.user;
    }

    dispatch(setAlert({ msg: data.message, type: "danger", id }));
    setTimeout(() => dispatch(removeAlert(id)), 5000);

    return rejectWithValue(data.message);
  },
);

// loading current user from initial load
// makes the thunk end rejected with a payload (so your extraReducers can handle the error reliably).
export const loadCurrentUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/users/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) return data.data.user;
      return rejectWithValue(data.message);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authRegisterAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authRegisterAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authRegisterAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(authLoginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authLoginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authLoginAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      });
    builder
      .addCase(loadCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loadCurrentUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(authLogoutAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authLogoutAsync.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(authLogoutAsync.rejected, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export default authSlice.reducer;
