import style from './MonName.module.css'
import type { FC } from 'react'
import type { MonName as MonNameType } from '../../store/pokemonApi'
import { toClassName } from '../../helpers/toClassNames'

interface Props {
  name?: MonNameType
  smaller?: boolean
  caught?: boolean
  className?: string
}

export const MonName: FC<Props> = ({ name, smaller, caught, className }) => {
  return (
    <p className={toClassName(style.component, smaller && 'smaller', className)}>
      {name ?? '???'}
      {caught && (
        <svg height={'1lh'} width={'1lh'} viewBox="0 0 100 100" className={style.caught}>
          <circle cx="50" cy="50" r="50"></circle>
        </svg>
      )}
    </p>
  )
}
