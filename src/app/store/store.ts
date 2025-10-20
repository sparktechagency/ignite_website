import { configureStore } from '@reduxjs/toolkit'
import applyIgniteReducer from './features/applyIgnite/applyIgniteSlice'
import applyClubReducer from './features/applyClubSlice'
import baseApis from './baseApis'

export const store = configureStore({
  reducer: {
    applyIgnite: applyIgniteReducer,
    applyClub: applyClubReducer,
    [baseApis.reducerPath]: baseApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApis.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
