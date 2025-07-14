import { useContext } from 'react'
import { EnemyContext } from './EnemyContext'

export const useEnemy = () => useContext(EnemyContext)
