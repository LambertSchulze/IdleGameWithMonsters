import style from './MonName.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'
import { toClassName } from '../../helpers/toClassNames'

interface Props extends Pick<MonDetailData, 'name'> {
  smaller?: boolean
  className: string
}

export const MonName: FC<Partial<Props>> = ({ name, smaller, className }) => {
  return (
    <p className={toClassName(style.component, smaller ? 'smaller' : '', className ?? '')}>
      {name ?? '???'}
    </p>
  )
}
