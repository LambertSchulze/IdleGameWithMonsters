import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { useMonDetailQuery, type MonName } from '../../store/pokemonApi'
import { type Enemy, EnemyContext } from './EnemyContext'
import { getLeveledStats } from '../Stats/getLeveledStats'
import { useAppSelector } from '../../store/store'

interface Props extends PropsWithChildren {
  monName: MonName
  level: number
}

export const EnemyProvider: FC<Props> = ({ monName, level, children }) => {
  const [enemyData, setEnemyData] = useState<Enemy | null>(null)
  const { data, isSuccess } = useMonDetailQuery(monName)
  const deckEntry = useAppSelector(store => store.deckState[monName])

  useEffect(() => {
    if (isSuccess) {
      const stats = getLeveledStats(data.baseStats, level)

      setEnemyData({
        ...data,
        level,
        stats,
        isCaught: deckEntry && 'caught' in deckEntry
      })
    }
  }, [isSuccess, data, level, deckEntry])

  return <EnemyContext.Provider value={enemyData}>{children}</EnemyContext.Provider>
}
