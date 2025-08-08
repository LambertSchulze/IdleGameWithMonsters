import { toClassName } from '../../helpers/toClassNames'
import styles from './LevelBar.module.css'
import { type FC } from 'react'

interface Props {
  level: number
  canLevelUp: boolean
  exp: number
  expForNextLvl: number
  handleLevelUp: () => void
  className?: string
}

export const LevelBar: FC<Props> = ({
  level,
  canLevelUp,
  exp,
  expForNextLvl,
  handleLevelUp,
  className
}) => {
  return (
    <div className={toClassName(styles.component, className)}>
      {'Lvl ' + level}
      {canLevelUp && (
        <button className={styles.level_up_button} onClick={handleLevelUp}>
          Level Up
        </button>
      )}
      <br />
      <progress id={'expBar'} max={expForNextLvl} value={exp} />
    </div>
  )
}
