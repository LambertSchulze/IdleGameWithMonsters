import { createContext } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'

export interface Enemy extends MonDetailData {
  level: number
  maxHp: number
  health: number
  isFainted: boolean
  addDamage: (attack: number) => void
}

export const EnemyContext = createContext<Enemy | null>(null)
