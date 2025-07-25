import styles from './Team.module.css'
import { type FC, useState, useCallback } from 'react'
import type { Team as TeamType } from '../../game/Team/TeamContext'
import { toClassName } from '../../helpers/toClassNames'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Image } from '../Image/Image'
import { MonName } from '../MonName/MonName'
import { CountdownBar } from '../CountdownBar/ContdownBar'
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
    <div>
      <Image
        back
        sprites={sprites}
        className={toClassName(styles.image, animate ? 'attack_animation' : '')}
        onAnimationEnd={() => setAnimate(false)}
      />
      <MonName name={name} className={styles.name} />
      <p className={styles.level}>
        {'Lvl ' + level}
        {canLevelUp && (
          <button className={styles.level_up_button} onClick={handleLevelUp}>
            Level Up
          </button>
        )}
        <br />
        <progress id={'expBar'} max={expForNextLvl} value={exp} />
      </p>
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
