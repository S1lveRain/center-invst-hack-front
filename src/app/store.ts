import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./services/authService";
import tokenReducer from "./slices/authSlice";
// ...

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  token: tokenReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authAPI.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
