import styles from './HealthBar.module.css'
import type { FC } from 'react'
import { toClassName } from '../../helpers/toClassNames'

interface Props {
  health: number
  maxHp: number
  className?: string
}

export const HealthBar: FC<Props> = ({ health, maxHp, className }) => {
  return (
    <div className={toClassName(styles.component, className ?? '')}>
      {health}{' '}
      <meter
        id={`health_bar`}
        min="0"
        max={maxHp}
        low={maxHp / 5}
        high={maxHp / 2}
        optimum={maxHp}
        value={health}
        className={styles.meter}
      ></meter>{' '}
      {maxHp}
    </div>
  )
}
