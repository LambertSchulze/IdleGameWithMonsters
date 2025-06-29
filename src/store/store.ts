import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from './pokemonApi'
import { runSlice } from './runSlice'
import { teamSlice } from './teamSlice'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [runSlice.name]: runSlice.reducer,
    [teamSlice.name]: teamSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pokemonApi.middleware)
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
