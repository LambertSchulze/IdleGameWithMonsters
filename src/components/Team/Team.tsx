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

interface Props extends Pick<TeamType, 'name' | 'level' | 'sprites' | 'expAtLvl'> {
  battleState: string
  attackCallback: () => void
}

export const Team: FC<Props> = ({
  name,
  level,
  sprites,
  expAtLvl,
  battleState,
  attackCallback
}) => {
  const dispatch = useAppDispatch()
  const [animate, setAnimate] = useState(false)
  const exp = useAppSelector(state => state.gameState.exp)
  const expForNextLevel = expAtLvl(level + 1)
  const canLevelUp = exp >= expForNextLevel

  const handleCountdownComplete = useCallback(() => {
    attackCallback()
    setAnimate(true)
  }, [attackCallback])

  const handleLevelUp = () => {
    dispatch(reduceExp(expForNextLevel))
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
      </p>
      {battleState === 'BATTLING' && (
        <CountdownBar
          durationInMS={3000}
          onComplete={handleCountdownComplete}
          className={styles.attackBar}
        />
      )}
    </div>
  )
}
