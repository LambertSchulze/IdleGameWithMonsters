import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type MonName } from './pokemonApi'

export interface DeckEntry {
  name: MonName
  spotted: number
  caught?: number
  level?: number
  inTeam?: boolean
}

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
          spotted: new Date().valueOf()
        }
      }
    },
    catchMon(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      state[monName] = {
        ...state[monName],
        caught: new Date().valueOf(),
        level: 1
      }
    },
    levelUp(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

      if (!state[monName].level) {
        throw new Error("Can't level up an uncaptured Mon")
      }

      state[monName] = {
        ...state[monName],
        level: ++state[monName].level
      }
    },
    addToTeam(state, mon: PayloadAction<MonName>) {
      const monName = mon.payload

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
  },
  selectors: {
    teamMembers: (state): DeckEntry[] => Object.values(state).filter(entry => entry.inTeam)
  }
})

export const { addToDeck, catchMon, levelUp, addToTeam, removeFromTeam } = deckSlice.actions
export const { teamMembers } = deckSlice.selectors
