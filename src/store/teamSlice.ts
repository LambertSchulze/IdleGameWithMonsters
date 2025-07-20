import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MonName, MoveName } from './pokemonApi'

export interface TeamMemberData {
  name: MonName
  attack: MoveName
}

export interface TeamState {
  0: TeamMemberData | null
}

const initialState: TeamState = {
  0: null
}

export const teamSlice = createSlice({
  name: 'teamState',
  initialState,
  reducers: {
    addToTeam(state, mon: PayloadAction<TeamMemberData>) {
      const member = mon.payload
      state[0] = member
    }
  }
})

export const { addToTeam } = teamSlice.actions
