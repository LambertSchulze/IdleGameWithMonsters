import styles from './Enemy.module.css'
import type { FC } from 'react'
import type { Enemy as EnemyType } from '../../game/Enemy/EnemyContext'
import { toClassName } from '../../helpers/toClassNames'
import { Image } from '../../components/Image/Image'
import { MonName } from '../../components/MonName/MonName'
import { HealthBar } from '../../components/HealthBar/HealthBar'
import { useBattle } from '../../game/Battle/useBattle'

export const Enemy: FC<EnemyType> = ({ sprites, name, stats, isCaught, level }) => {
  const { battleState, catchCallback, damage } = useBattle()
  const health = Math.max(stats.hp - damage, 0)
  const isCatchable = (!isCaught && health < stats.hp / 5 && health !== 0) ?? false

  return (
    <div className={toClassName(styles.component, battleState)}>
      {isCatchable && <button onClick={catchCallback}>Catch!</button>}
      <Image front sprites={sprites} className={styles.image} />
      <MonName name={name} caught={isCaught} className={styles.name} />
      <p className={styles.level}>{'Lvl ' + level}</p>
      <HealthBar health={health} maxHp={stats.hp} className={styles.healthbar} />
    </div>
  )
}
