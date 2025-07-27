import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MonName } from './pokemonApi'

export interface GameState {
  exp: number
  stageId: number
  starterMons: MonName[]
}

const initialState: GameState = {
  exp: 0,
  stageId: 0,
  starterMons: ['bulbasaur', 'charmander', 'squirtle'] as MonName[]
}

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    addExp(state, exp: PayloadAction<number>) {
      state.exp += Math.round(exp.payload)
    },
    reduceExp(state, exp: PayloadAction<number>) {
      state.exp -= exp.payload
    },
    incrementStageId(state) {
      state.stageId++
    }
  }
})

export const { addExp, reduceExp, incrementStageId } = gameSlice.actions
