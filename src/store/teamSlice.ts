import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface TeamMember {
  name: string
  level: number
  kills: number
}

export interface TeamState {
  0: TeamMember
}

const initialState: TeamState = {
  0: {
    name: '',
    level: 1,
    kills: 0
  }
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
