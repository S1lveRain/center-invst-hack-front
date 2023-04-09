import { authAPI } from "./services/AuthApi";
import tokenReducer from "./slices/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { directionApi } from "./services/DirectionApi";
import { testsApi } from "./services/TestsApi";
import { userAPI } from "./services/UserApi";

const rootReducer = combineReducers({
  [directionApi.reducerPath]: directionApi.reducer,
  [testsApi.reducerPath]: testsApi.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  token: tokenReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddware) =>
    getDefaultMiddware({}).concat([
      directionApi.middleware,
      testsApi.middleware,
      authAPI.middleware,
      userAPI.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
