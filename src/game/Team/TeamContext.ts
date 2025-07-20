import { createContext } from 'react'
import type { MonDetailData, TypeDetailData, MoveDetailData } from '../../store/pokemonApi'

export interface Team extends MonDetailData {
  attack: Omit<MoveDetailData, 'type'> & {
    type: TypeDetailData
  }
  expAtLvl: (x: number) => number | undefined
}

export const TeamContext = createContext<Team | null>(null)
