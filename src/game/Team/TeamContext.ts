import { createContext } from 'react'
import type { MonDetailData, TypeDetailData, MoveDetailData } from '../../store/pokemonApi'

export interface Team extends MonDetailData {
  level: number
  attack: Omit<MoveDetailData, 'type'> & {
    type: TypeDetailData
  }
  expAtLvl: (x: number) => number
}

export const TeamContext = createContext<Team | null>(null)
