import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MonName, MoveName } from './pokemonApi'

export interface TeamMemberData {
  name: MonName
  attack: MoveName
}

export interface TeamState {
  0: TeamMemberData
}

const initialState: TeamState = {
  0: {
    name: '' as MonName,
    attack: '' as MoveName
  }
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
