import styles from './Enemy.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'
import { Image } from '../../components/Image/Image'
import { MonName } from '../../components/MonName/MonName'
import { HealthBar } from '../../components/HealthBar/HealthBar'

export interface Props extends Pick<MonDetailData, 'name' | 'stats' | 'sprites'> {
  health: number
}

export const Enemy: FC<Props> = props => {
  return (
    <div>
      <Image front sprites={props.sprites} />
      <MonName name={props.name} className={styles.name} />
      <HealthBar health={props.health} stats={props.stats} />
    </div>
  )
}
