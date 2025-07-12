import style from './MonName.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'

interface Props extends Pick<MonDetailData, 'name'> {
  smaller?: boolean
  className: string
}

export const MonName: FC<Partial<Props>> = ({ name, smaller, className }) => {
  return (
    <p className={`${style.component} ${smaller ? 'smaller' : ''} ${className ?? ''}`}>
      {name ?? '???'}
    </p>
  )
}
