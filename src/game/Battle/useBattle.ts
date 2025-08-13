import { useContext } from 'react'
import { BattleContext } from './BattleContext'

export const useBattle = () => useContext(BattleContext)
