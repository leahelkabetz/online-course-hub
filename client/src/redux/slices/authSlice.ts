import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  id: number |null;
  email: string|null;
  isAdmin: boolean | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
  id: null,
  email: null,
  isAdmin: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser:(state, action: PayloadAction<{  username: string }>) =>{
      debugger
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
});

export const { loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectUsername = (state: RootState) => state.auth.username;
