import { createContext } from 'react'

interface BattleContextType {
  team: {
    name: string
    spriteBack: string
    attack: () => void
  }
  enemy: {
    name: string
    spriteFront: string
    hp: number
    health: number
  }
}

export const BattleContext = createContext<BattleContextType>({
  team: {
    name: '',
    spriteBack: '',
    attack: () => null
  },
  enemy: {
    name: '',
    spriteFront: '',
    hp: 0,
    health: 0
  }
})
