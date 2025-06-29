import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type MonDetailData } from './pokemonApi'

export interface TeamMember extends MonDetailData {
  level: number
  kills: number
}

export interface TeamState {
  0: TeamMember | null
}

const initialState: TeamState = {
  0: null
}

export const teamSlice = createSlice({
  name: 'teamState',
  initialState,
  reducers: {
    addToTeam(state, mon: PayloadAction<TeamMember>) {
      const member = mon.payload
      state[0] = member
    },
    incrementKillCount(state) {
      const member = state[0]
      if (member) {
        state[0] = { ...member, kills: member.kills + 1 }
      }
    }
  }
})

export const { addToTeam, incrementKillCount } = teamSlice.actions
