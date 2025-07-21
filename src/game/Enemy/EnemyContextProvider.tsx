import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { useMonDetailQuery, type MonName } from '../../store/pokemonApi'
import { type Enemy, EnemyContext } from './EnemyContext'
import { getStats } from '../Stats/getStats'

interface Props extends PropsWithChildren {
  monName: MonName
  level: number
}

export const EnemyProvider: FC<Props> = ({ monName, level, children }) => {
  const [damage, setDamage] = useState(0)
  const [enemyData, setEnemyData] = useState<Enemy | null>(null)
  const { data, isSuccess } = useMonDetailQuery(monName)

  useEffect(() => {
    if (isSuccess) {
      const stats = getStats(data.baseStats, level)

      setEnemyData({
        ...data,
        level,
        stats: stats,
        health: Math.max(stats.hp - damage, 0),
        isFainted: damage >= stats.hp,
        addDamage: (attack: number) => setDamage(damage => damage + attack)
      })
    }
  }, [isSuccess, damage, data, level])

  useEffect(() => {
    setDamage(0)
  }, [monName])

  return <EnemyContext.Provider value={enemyData}>{children}</EnemyContext.Provider>
}
