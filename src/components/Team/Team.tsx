import styles from './Team.module.css'
import { type FC, useState, useCallback } from 'react'
import type { Team as TeamType } from '../../game/Team/TeamContext'
import { toClassName } from '../../helpers/toClassNames'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Image } from '../Image/Image'
import { MonName } from '../MonName/MonName'
import { LevelBar } from '../LevelBar/LevelBar'
import { CountdownBar } from '../CountdownBar/CountdownBar'
import { reduceExp } from '../../store/gameSlice'
import { levelUp } from '../../store/deckSlice'

interface Props extends Pick<TeamType, 'name' | 'level' | 'stats' | 'sprites' | 'expForNextLvl'> {
  battleState: string
  attackCallback: () => void
}

export const Team: FC<Props> = ({
  name,
  level,
  stats,
  sprites,
  expForNextLvl,
  battleState,
  attackCallback
}) => {
  const dispatch = useAppDispatch()
  const [animate, setAnimate] = useState(false)
  const exp = useAppSelector(state => state.gameState.exp)
  const canLevelUp = exp >= expForNextLvl

  const handleCountdownComplete = useCallback(() => {
    attackCallback()
    setAnimate(true)
  }, [attackCallback])

  const handleLevelUp = () => {
    dispatch(reduceExp(expForNextLvl))
    dispatch(levelUp(name))
  }

  return (
    <div className={styles.component}>
      <Image
        back
        sprites={sprites}
        className={toClassName(styles.image, animate && 'attack_animation')}
        onAnimationEnd={() => setAnimate(false)}
      />
      <MonName name={name} className={styles.name} />
      <LevelBar
        level={level}
        canLevelUp={canLevelUp}
        exp={exp}
        expForNextLvl={expForNextLvl}
        handleLevelUp={handleLevelUp}
        className={styles.levelBar}
      />
      {battleState === 'BATTLING' && (
        <CountdownBar
          durationInMS={Math.max(3000 - stats.speed * 100, 100)}
          onComplete={handleCountdownComplete}
          className={styles.attackBar}
        />
      )}
    </div>
  )
}
