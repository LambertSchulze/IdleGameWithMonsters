import styles from './Team.module.css'
import { type FC, useState, useEffect } from 'react'
import type { MonDetailData } from '../../store/pokemonApi'
import { toClassName } from '../../helpers/toClassNames'
import { Image } from '../Image/Image'
import { MonName } from '../MonName/MonName'
import { CountdownBar } from '../CountdownBar/ContdownBar'

interface Props extends Pick<MonDetailData, 'name' | 'sprites'> {
  battleState: string
  attackCallback: () => void
}

export const Team: FC<Props> = props => {
  const [triggerKey, setTriggerKey] = useState<number>(Date.now())

  useEffect(() => {
    if (props.battleState === 'BATTLING') {
      const interval = setInterval(() => {
        setTriggerKey(Date.now())
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [props.battleState])

  const handleComplete = () => {
    console.log('Countdown complete!')
    props.attackCallback()
  }

  return (
    <div className={toClassName(styles.component)}>
      <Image back sprites={props.sprites} className={styles.image} />
      <MonName name={props.name} className={styles.name} />
      {props.battleState === 'BATTLING' && (
        <CountdownBar durationInMS={3000} trigger={triggerKey} onComplete={handleComplete} />
      )}
    </div>
  )
}
