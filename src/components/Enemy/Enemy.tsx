import styles from './Enemy.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'
import { Image } from '../../components/Image/Image'
import { MonName } from '../../components/MonName/MonName'
import { HealthBar } from '../../components/HealthBar/HealthBar'

export interface Props extends Pick<MonDetailData, 'name' | 'stats' | 'sprites'> {
  health: number
  level: number
  maxHp: number
}

export const Enemy: FC<Props> = props => {
  return (
    <div>
      <Image front sprites={props.sprites} className={styles.image} />
      {'Lvl ' + props.level}
      <MonName name={props.name} className={styles.name} />
      <HealthBar health={props.health} maxHp={props.maxHp} className={styles.healthbar} />
    </div>
  )
}
