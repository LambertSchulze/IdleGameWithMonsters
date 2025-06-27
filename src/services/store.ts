import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from './pokemonApi'
import { runSlice } from './runSlice'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [runSlice.name]: runSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pokemonApi.middleware)
})
