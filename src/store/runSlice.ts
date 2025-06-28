import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface RunState {
  starterMons: number[]
  team: number[]
  enemies: number[]
}

const initialState: RunState = {
  starterMons: [1, 4, 7],
  team: [],
  enemies: [16, 19]
}

export const runSlice = createSlice({
  name: 'runState',
  initialState,
  reducers: {
    addToTeam(state, action: PayloadAction<number>) {
      const id = action.payload
      state.team.push(id)
    }
  }
})

export const { addToTeam: addToTeam } = runSlice.actions
