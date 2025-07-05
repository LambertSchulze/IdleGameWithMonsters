import type { MonName } from './pokemonApi'
import { createSlice } from '@reduxjs/toolkit'

export interface GameState {
  starterMons: MonName[]
  encounters: MonName[]
  event: 'STARTER' | 'BATTLE'
}

const initialState: GameState = {
  starterMons: ['bulbasaur', 'charmander', 'squirtle'] as MonName[],
  encounters: ['rattata', 'pidgey', 'caterpie', 'weedle', 'spearow'] as MonName[],
  event: 'STARTER'
}

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setEventToBattle(state) {
      state.event = 'BATTLE'
    }
  }
})

export const { setEventToBattle } = gameSlice.actions
