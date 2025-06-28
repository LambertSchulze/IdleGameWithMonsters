import { useState, useEffect, useCallback, type FC, type PropsWithChildren } from 'react'
import { BattleContext } from './BattleContext'
import { useMonDetailQuery } from '../store/pokemonApi'
import { useAppSelector } from '../store/store'

interface Props {
  enemy: number
}

export const BattleProvider: FC<PropsWithChildren<Props>> = ({ children, enemy }) => {
  const runState = useAppSelector(state => state.runState)
  const { data: teamData, isSuccess: teamDataReady } = useMonDetailQuery(runState.team[0])
  const { data: enemyData, isSuccess: enemyDataReady } = useMonDetailQuery(enemy)
  const [enemyHealth, setEnemyHealth] = useState(1)
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
      attack: () =>
        setEnemyHealth(health =>
          Math.max(
            health - Math.round(((2 / 5 + 2) * (teamData.attack / enemyData.defense)) / 50 + 2),
            0
          )
        )
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
