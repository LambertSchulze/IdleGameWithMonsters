import { createContext } from 'react'
import type { MonDetailData, Stats } from '../../store/pokemonApi'

export interface Enemy extends MonDetailData {
  level: number
  stats: Stats
  isCaught: boolean
}

export const EnemyContext = createContext<Enemy | null>(null)
