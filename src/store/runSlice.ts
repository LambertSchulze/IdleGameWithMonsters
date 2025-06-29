import { createSlice } from '@reduxjs/toolkit'

export interface RunState {
  starterMons: number[]
  encounters: number[]
  event: 'STARTER' | 'BATTLE'
}

const initialState: RunState = {
  starterMons: [1, 4, 7],
  encounters: [16, 19],
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
