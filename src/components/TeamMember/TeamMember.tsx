import styles from './TeamMember.module.css'
import { toClassName } from '../../helpers/toClassNames'
import { type FC, useState } from 'react'
import {
  useMonDetailQuery,
  type MonName as MonNameType,
  type Stats,
  type MonTypes,
  type TypeDetailData
} from '../../store/pokemonApi'
import { Image } from '../Image/Image'
import { MonName } from '../MonName/MonName'
import { LevelBar } from '../LevelBar/LevelBar'
import { CountdownBar } from '../CountdownBar/CountdownBar'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { reduceExp } from '../../store/gameSlice'
import { levelUp } from '../../store/deckSlice'
import { useLeveledMonQuery } from '../../game/useLeveledMon/useLeveledMon'
import type { BattleStateType } from '../../game/Battle/useBattle'

interface Props {
  name: MonNameType
  level: number
  battleState: BattleStateType
  attackCallback: (
    attackerLvl: number,
    attackerStats: Stats,
    attackerTypes: MonTypes
  ) => (attackPower: number, attackType: TypeDetailData) => void
}

export const TeamMember: FC<Props> = ({ name, level, battleState, attackCallback }) => {
  const dispatch = useAppDispatch()
  const [animate, setAnimate] = useState(false)
  const { data: monDetailData, isSuccess } = useMonDetailQuery(name)
  const leveledMonData = useLeveledMonQuery(name, level)
  const exp = useAppSelector(state => state.gameState.exp)

  if (!isSuccess || !leveledMonData) return null

  const handleCountdownComplete = () => {
    attackCallback(level, leveledMonData.stats, monDetailData.types)
    setAnimate(true)
  }

  const handleLevelUp = () => {
    dispatch(reduceExp(leveledMonData.expForNextLvl))
    dispatch(levelUp(name))
  }

  const canLevelUp = exp >= leveledMonData.expForNextLvl

  return (
    <div className={styles.component}>
      <Image
        back
        sprites={monDetailData.sprites}
        className={toClassName(styles.image, animate && 'attack_animation')}
        onAnimationEnd={() => setAnimate(false)}
      />
      <MonName name={name} className={styles.name} />
      <LevelBar
        level={level}
        canLevelUp={canLevelUp}
        exp={exp}
        expForNextLvl={leveledMonData.expForNextLvl}
        handleLevelUp={handleLevelUp}
        className={styles.levelBar}
      />
      {battleState === 'BATTLING' && (
        <CountdownBar
          durationInMS={Math.max(3000 - leveledMonData.stats.speed * 100, 100)}
          onComplete={handleCountdownComplete}
          className={styles.attackBar}
        />
      )}
    </div>
  )
}
