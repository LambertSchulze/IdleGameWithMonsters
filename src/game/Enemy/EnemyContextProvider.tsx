import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { useMonDetailQuery, type MonName } from '../../store/pokemonApi'
import { type Enemy, EnemyContext } from './EnemyContext'
import { getStats } from '../Stats/getStats'
import { useAppSelector } from '../../store/store'

interface Props extends PropsWithChildren {
  monName: MonName
  level: number
}

export const EnemyProvider: FC<Props> = ({ monName, level, children }) => {
  const [damage, setDamage] = useState(0)
  const [enemyData, setEnemyData] = useState<Enemy | null>(null)
  const { data, isSuccess } = useMonDetailQuery(monName)
  const isCaught = Boolean(useAppSelector(store => store.deckState[monName]?.caught))

  useEffect(() => {
    if (isSuccess) {
      const stats = getStats(data.baseStats, level)

      setEnemyData({
        ...data,
        level,
        stats,
        health: Math.max(stats.hp - damage, 0),
        isFainted: damage >= stats.hp,
        addDamage: (attack: number) => setDamage(damage => damage + attack),
        isCaught
      })
    }
  }, [isSuccess, damage, data, level, isCaught])

  useEffect(() => {
    setDamage(0)
  }, [monName])

  return <EnemyContext.Provider value={enemyData}>{children}</EnemyContext.Provider>
}
