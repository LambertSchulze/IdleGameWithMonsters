import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MonName } from './pokemonApi'
import type { TeamMemberData } from '../game/Team/Team'

export interface TeamState {
  0: TeamMemberData
}

const initialState: TeamState = {
  0: {
    name: '' as MonName,
    level: 1,
    kills: 0
  }
}

export const teamSlice = createSlice({
  name: 'teamState',
  initialState,
  reducers: {
    addToTeam(state, mon: PayloadAction<TeamMemberData>) {
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
