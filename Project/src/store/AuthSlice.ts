import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/apiTypes";

interface AuthState {
  isAuth: boolean;
  userData: User | null;
  isModal: boolean;
  isFavorite: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  userData: null,
  isModal: false,
  isFavorite: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isModal = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<boolean>) => {
      state.isFavorite = action.payload;
    },
  },
});

export const { toggleAuth, setUserData, clearUserData, toggleModal, toggleFavorite } =
  AuthSlice.actions;
export default AuthSlice.reducer;
