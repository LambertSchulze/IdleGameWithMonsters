import style from './MonName.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'

interface Props extends Pick<MonDetailData, 'name'> {
  className: string
}

export const MonName: FC<Partial<Props>> = ({ name, className }) => {
  return <p className={`${style.component} ${className}`}>{name ?? '???'}</p>
}
