import type { FC } from 'react'
import type { MonDetailData, MonName } from '../../store/pokemonApi'

export interface TeamMemberData {
  name: MonName
  level: number
  kills: number
}

interface Props extends TeamMemberData, MonDetailData {}

export const Team: FC<Props> = props => {
  return (
    <div>
      <img src={props.spriteBack} alt="" />
      <p>
        Lvl. {props.level} {props.name}
      </p>
      <p>Kills: {props.kills}</p>
    </div>
  )
}
