import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type MonName } from './pokemonApi'

export interface DeckState {
  [key: MonName]: {
    name: MonName
    spotted: number
    caught?: number
  }
}

const initialState: DeckState = {}

export const deckSlice = createSlice({
  name: 'deckState',
  initialState,
  reducers: {
    addToDeck(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      if (!state[monName]) {
        state[monName] = {
          name: monName,
          spotted: new Date().valueOf()
        }
      }
    },
    captureMon(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      state[monName] = {
        ...state[monName],
        caught: new Date().valueOf()
      }
    }
  }
})

export const { addToDeck, captureMon } = deckSlice.actions
