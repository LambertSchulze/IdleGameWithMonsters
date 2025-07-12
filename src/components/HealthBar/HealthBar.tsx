import styles from './HealthBar.module.css'
import type { FC } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'

interface Props extends Pick<MonDetailData, 'stats'> {
  health: number
  className?: string
}

export const HealthBar: FC<Props> = ({ health, stats, className }) => {
  return (
    <div className={`${styles.component} ${className ?? ''}`}>
      {health}{' '}
      <meter
        id={`health_bar`}
        min="0"
        max={stats.hp}
        low={stats.hp / 5}
        high={stats.hp / 2}
        optimum={stats.hp}
        value={health}
        className={styles.meter}
      ></meter>{' '}
      {stats.hp}
    </div>
  )
}
