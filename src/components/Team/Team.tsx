import styles from './Team.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'
import { Image } from '../Image/Image'
import { MonName } from '../MonName/MonName'

type Props = Pick<MonDetailData, 'name' | 'sprites'>

export const Team: FC<Props> = props => {
  return (
    <div className={styles.component}>
      <Image back sprites={props.sprites} className={styles.image} />
      <MonName name={props.name} className={styles.name} />
    </div>
  )
}
