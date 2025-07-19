import styles from './Team.module.css'
import { type FC, useState, useCallback } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'
import { toClassName } from '../../helpers/toClassNames'
import { Image } from '../Image/Image'
import { MonName } from '../MonName/MonName'
import { CountdownBar } from '../CountdownBar/ContdownBar'

interface Props extends Pick<MonDetailData, 'name' | 'sprites'> {
  battleState: string
  attackCallback: () => void
}

export const Team: FC<Props> = ({ name, sprites, battleState, attackCallback }) => {
  const [animate, setAnimate] = useState(false)

  const handleComplete = useCallback(() => {
    attackCallback()
    setAnimate(true)
  }, [attackCallback])

  return (
    <div>
      <Image
        back
        sprites={sprites}
        className={toClassName(styles.image, animate ? 'attack-animation' : '')}
        onAnimationEnd={() => setAnimate(false)}
      />
      <MonName name={name} className={styles.name} />
      {battleState === 'BATTLING' && (
        <CountdownBar
          durationInMS={3000}
          onComplete={handleComplete}
          className={styles.attackBar}
        />
      )}
    </div>
  )
}
