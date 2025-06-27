import { createSlice } from '@reduxjs/toolkit'

export interface RunState {
  starterMon: number
  team: number[]
}

const initialState: RunState = {
  starterMon: 0,
  team: []
}

export const runSlice = createSlice({
  name: 'runState',
  initialState,
  reducers: {}
})
