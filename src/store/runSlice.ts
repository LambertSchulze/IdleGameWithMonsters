import type { MonName } from './pokemonApi'
import { createSlice } from '@reduxjs/toolkit'

export interface RunState {
  starterMons: MonName[]
  encounters: MonName[]
  event: 'STARTER' | 'BATTLE'
}

const initialState: RunState = {
  starterMons: ['bulbasaur', 'charmander', 'squirtle'] as MonName[],
  encounters: ['rattata', 'pidgey'] as MonName[],
  event: 'STARTER'
}

export const runSlice = createSlice({
  name: 'runState',
  initialState,
  reducers: {
    setEventToBattle(state) {
      state.event = 'BATTLE'
    }
  }
})

export const { setEventToBattle } = runSlice.actions
