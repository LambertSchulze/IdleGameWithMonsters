import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { useMonDetailQuery, type MonName } from '../../store/pokemonApi'
import { EnemyContext } from './EnemyContext'

interface Props extends PropsWithChildren {
  monName: MonName
  level: number
}

export const EnemyProvider: FC<Props> = ({ monName, level, children }) => {
  const [damage, setDamage] = useState(0)
  const { data, isSuccess } = useMonDetailQuery(monName)
  const maxHp = (baseHp: number) => Math.floor((baseHp * 2 * level) / 100 + level + 10)
  let enemy = null

  if (isSuccess) {
    enemy = {
      ...data,
      level,
      maxHp: maxHp(data.stats.hp),
      health: Math.max(maxHp(data.stats.hp) - damage, 0),
      isFainted: damage >= maxHp(data.stats.hp),
      addDamage: (attack: number) => setDamage(damage => damage + attack)
    }
  }

  useEffect(() => {
    setDamage(0)
  }, [monName])

  return <EnemyContext.Provider value={enemy}>{children}</EnemyContext.Provider>
}
