import { useState, useEffect, useCallback } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { BattleContext } from './BattleContext'
import { useMonDetailQuery } from '../services/pokemonApi'

interface Props {
  enemy: number
}

export const BattleProvider: FC<PropsWithChildren<Props>> = ({ children, enemy }) => {
  const { data: teamData, isSuccess: teamDataReady } = useMonDetailQuery(1)
  const { data: enemyData, isSuccess: enemyDataReady } = useMonDetailQuery(enemy)
  const [enemyHealth, setEnemyHealth] = useState(33)
  const initEnemyHealth = useCallback((enemyHp: number) => {
    setEnemyHealth(enemyHp)
  }, [])

  useEffect(() => {
    if (enemyDataReady) {
      initEnemyHealth(enemyData.hp)
    }
  }, [enemyDataReady, initEnemyHealth, enemyData])

  if (!teamDataReady || !enemyDataReady) return '...'

  const context = {
    team: {
      name: teamData.name,
      spriteBack: teamData.spriteBack,
      attack: () => setEnemyHealth(health => Math.max(health - 5, 0))
    },
    enemy: {
      name: enemyData.name,
      spriteFront: enemyData.spriteFront,
      hp: enemyData.hp,
      health: enemyHealth
    }
  }

  return <BattleContext.Provider value={context}>{children}</BattleContext.Provider>
}
