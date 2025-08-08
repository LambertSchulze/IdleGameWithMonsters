import style from './Image.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'
import { toClassName } from '../../helpers/toClassNames'

interface Props extends Pick<MonDetailData, 'sprites'> {
  front: boolean
  back: boolean
  className?: string
  onAnimationEnd?: () => void
}

export const Image: FC<Partial<Props>> = ({ sprites, front, back, className, onAnimationEnd }) => {
  return (
    <img
      src={sprites && (front ? sprites.front : back ? sprites.back : '')}
      alt=""
      width={96}
      height={96}
      className={toClassName(style.component, className)}
      onAnimationEnd={onAnimationEnd}
    />
  )
}
