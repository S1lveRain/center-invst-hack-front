import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { directionApi } from './services/DirectionApi'
// ...

const rootReducer = combineReducers({
    [directionApi.reducerPath]: directionApi.reducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddware =>
    getDefaultMiddware({}).concat([
        directionApi.middleware,
    ])
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch