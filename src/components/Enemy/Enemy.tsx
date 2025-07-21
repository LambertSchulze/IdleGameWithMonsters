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
  battleState: string
}

export const Enemy: FC<Props> = ({ health, level, battleState, sprites, name, stats }) => {
  return (
    <div className={toClassName(styles.component, battleState)}>
      <Image front sprites={sprites} className={styles.image} />
      <MonName name={name} className={styles.name} />
      <p className={styles.level}>{'Lvl ' + level}</p>
      <HealthBar health={health} maxHp={stats.hp} className={styles.healthbar} />
    </div>
  )
}
