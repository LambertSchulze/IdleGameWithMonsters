import styles from './Enemy.module.css'
import type { FC } from 'react'
import type { Enemy as EnemyType } from '../../game/Enemy/EnemyContext'
import { toClassName } from '../../helpers/toClassNames'
import { Image } from '../../components/Image/Image'
import { MonName } from '../../components/MonName/MonName'
import { HealthBar } from '../../components/HealthBar/HealthBar'

export interface Props extends Pick<EnemyType, 'name' | 'stats' | 'sprites'> {
  health: number
  level: number
  caught: boolean
  battleState: string
  isCatchable: boolean
  catchCallback: () => void
}

export const Enemy: FC<Props> = ({
  sprites,
  name,
  stats,
  health,
  level,
  caught,
  battleState,
  isCatchable,
  catchCallback
}) => {
  return (
    <div className={toClassName(styles.component, battleState)}>
      {isCatchable && <button onClick={catchCallback}>Catch!</button>}
      <Image front sprites={sprites} className={styles.image} />
      <MonName name={name} caught={caught} className={styles.name} />
      <p className={styles.level}>{'Lvl ' + level}</p>
      <HealthBar health={health} maxHp={stats.hp} className={styles.healthbar} />
    </div>
  )
}
