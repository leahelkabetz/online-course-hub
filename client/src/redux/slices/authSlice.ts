import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
   password: number | null;
  email: string | null;
  isAdmin: boolean | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
  password: null,
  email: null,
  isAdmin: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{
        username: string;
        password: number;
        email: string;
        isAdmin: boolean;
      }>
    ) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.password = null;
      state.email = null;
      state.isAdmin = null;
    }

  },
});

export const { loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectUsername = (state: RootState) => state.auth.username;
