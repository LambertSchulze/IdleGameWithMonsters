import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MonName } from './pokemonApi'

export interface GameState {
  exp: number
  starterMons: MonName[]
  encounters: MonName[]
  event: 'STARTER' | 'BATTLE'
}

const initialState: GameState = {
  exp: 0,
  starterMons: ['bulbasaur', 'charmander', 'squirtle'] as MonName[],
  encounters: ['rattata', 'pidgey', 'caterpie', 'weedle', 'spearow'] as MonName[],
  event: 'STARTER'
}

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    addExp(state, exp: PayloadAction<number>) {
      state.exp += exp.payload
    },
    setEventToBattle(state) {
      state.event = 'BATTLE'
    }
  }
})

export const { addExp, setEventToBattle } = gameSlice.actions
