import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from './store'
import { type MonName } from './pokemonApi'

type SpottedMon = {
  name: MonName
  status: 'spotted'
  spotted: number
}

type CaughtMon = {
  name: MonName
  status: 'caught'
  spotted: number
  caught: number
  level: number
  inTeam?: false
}

type TeamMon = {
  name: MonName
  status: 'caught'
  spotted: number
  caught: number
  level: number
  inTeam: true
}

export type DeckEntry = SpottedMon | CaughtMon | TeamMon

export interface DeckState {
  [key: MonName]: DeckEntry
}

const initialState: DeckState = {}

export const deckSlice = createSlice({
  name: 'deckState',
  initialState,
  reducers: {
    addToDeck(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      if (!state[monName]) {
        state[monName] = {
          name: monName,
          status: 'spotted',
          spotted: new Date().valueOf()
        }
      }
    },
    catchMon(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      state[monName] = {
        ...state[monName],
        status: 'caught',
        caught: new Date().valueOf(),
        level: 1
      }
    },
    levelUp(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      if (state[monName].status !== 'caught') {
        throw new Error("Can't level up an uncaught Mon")
      }

      state[monName] = {
        ...state[monName],
        level: ++state[monName].level
      }
    },
    addToTeam(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      if (state[monName].status !== 'caught') {
        throw new Error("Can't add uncaught Mon to team")
      }

      state[monName] = {
        ...state[monName],
        inTeam: true
      }
    },
    removeFromTeam(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      state[monName] = {
        ...state[monName],
        inTeam: false
      }
    }
  }
})

type TeamMembersSelector = (state: RootState) => TeamMon[]

export const teamMembers: TeamMembersSelector = createSelector(
  state => Object.values(state),
  arr => arr.filter((entry: DeckEntry) => entry.status === 'caught' && entry.inTeam)
)

export const { addToDeck, catchMon, levelUp, addToTeam, removeFromTeam } = deckSlice.actions
