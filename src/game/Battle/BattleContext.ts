import { createContext } from 'react'
import type { MonTypes, Stats, TypeDetailData } from '../../store/pokemonApi'

export const BattleState = {
  SETUP_BATTLE: 'SETUP_BATTLE',
  BATTLING: 'BATTLING',
  CATCHING: 'CATCHING',
  BATTLE_END: 'BATTLE_END'
} as const
export type BattleState = keyof typeof BattleState

export interface Battle {
  battleState: BattleState
  attackCallback: (
    attackerLvl: number,
    attackerStats: Stats,
    attackerTypes: MonTypes,
    attackPower: number,
    attackType: TypeDetailData
  ) => void
  catchCallback: () => void
  damage: number
}

const initialState = {
  battleState: BattleState.SETUP_BATTLE,
  attackCallback: () => {},
  catchCallback: () => null,
  damage: 0
}

export const BattleContext = createContext<Battle>(initialState)
