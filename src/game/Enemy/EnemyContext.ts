import { createContext } from 'react'
import type { MonDetailData, Stats } from '../../store/pokemonApi'

export interface Enemy extends MonDetailData {
  level: number
  stats: Stats
  health: number
  isFainted: boolean
  addDamage: (attack: number) => void
}

export const EnemyContext = createContext<Enemy | null>(null)
