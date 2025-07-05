import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'

export interface EnemyData {
  health: number
}

interface Props extends EnemyData, MonDetailData {}

export const Enemy: FC<Props> = props => {
  return (
    <div>
      <img src={props.spriteFront} alt="" />
      <p>{props.name}</p>
      {props.health} <meter id="enemy_hp" min="0" max={props.hp} value={props.health}></meter>{' '}
      {props.hp}
    </div>
  )
}
