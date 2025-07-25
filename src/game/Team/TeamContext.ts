import { createContext } from 'react'
import type { MonDetailData, TypeDetailData, MoveDetailData, Stats } from '../../store/pokemonApi'

export interface Team extends MonDetailData {
  level: number
  stats: Stats
  attack: Omit<MoveDetailData, 'type'> & {
    type: TypeDetailData
  }
  expForNextLvl: number
}

export const TeamContext = createContext<Team | null>(null)
