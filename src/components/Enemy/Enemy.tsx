import styles from './Enemy.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'
import { toClassName } from '../../helpers/toClassNames'
import { Image } from '../../components/Image/Image'
import { MonName } from '../../components/MonName/MonName'
import { HealthBar } from '../../components/HealthBar/HealthBar'

export interface Props extends Pick<MonDetailData, 'name' | 'stats' | 'sprites'> {
  health: number
  level: number
  maxHp: number
  battleState: string
}

export const Enemy: FC<Props> = ({ health, level, maxHp, battleState, sprites, name }) => {
  return (
    <div className={toClassName(styles.component, battleState)}>
      <Image front sprites={sprites} className={styles.image} />
      <MonName name={name} className={styles.name} />
      <p className={styles.level}>{'Lvl ' + level}</p>
      <HealthBar health={health} maxHp={maxHp} className={styles.healthbar} />
    </div>
  )
}
