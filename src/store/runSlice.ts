import { createSlice } from '@reduxjs/toolkit'

export interface RunState {
  starterMons: string[]
  encounters: string[]
  event: 'STARTER' | 'BATTLE'
}

const initialState: RunState = {
  starterMons: ['bulbasaur', 'charmander', 'squirtle'],
  encounters: ['rattata', 'pidgey'],
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
