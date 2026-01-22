import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorSliceState {
  isError: boolean;
  errorText: string | null;
}

const initialState: ErrorSliceState = {
  isError: false,
  errorText: null,
};

const ErrorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setErrorText: (state, action: PayloadAction<string>) => {
      state.errorText = action.payload;
    },
    resetErrorText: (state) => {
      state.errorText = null;
    },
    toggleIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const { setErrorText, resetErrorText, toggleIsError } =
  ErrorSlice.actions;

export default ErrorSlice.reducer;
