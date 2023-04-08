import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DispatchType, InitStateToken, StateType } from "../storeTypes";

const initialState: InitStateToken = {
  tokenValue: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    created(state, action: PayloadAction<any>) {
      localStorage.setItem("token", action.payload.tokens.accessToken);
      localStorage.setItem("userId", action.payload.user.id);

      state.tokenValue = action.payload.tokens.accessToken;
      state.userId = action.payload.user.id;
    },
    removed(state) {
      localStorage.removeItem("token");
      state.tokenValue = null;
    },
  },
});

const { actions, reducer: tokenReducer } = authSlice;
const { created, removed } = actions;

export const createToken = (data: any) => (dispatch: DispatchType) => {
  dispatch(created(data));
};
export const removeToken = () => (dispatch: DispatchType) => {
  dispatch(removed());
};

export const getToken = () => (state: StateType) => state.token.tokenValue;
export const getUser = () => (state: StateType) => state.token.userId;
export default tokenReducer;
