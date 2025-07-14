import { createContext } from 'react'
import type { MonDetailData, TypeDetailData, MoveDetailData } from '../../store/pokemonApi'

export interface Team extends Omit<MonDetailData, 'types'> {
  types: {
    1: TypeDetailData
    2: TypeDetailData | null
  }
  attack: MoveDetailData
}

export const TeamContext = createContext<Team | null>(null)
