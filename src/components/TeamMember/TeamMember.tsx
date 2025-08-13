import styles from './TeamMember.module.css'
import { toClassName } from '../../helpers/toClassNames'
import { type FC, useState } from 'react'
import { useMonDetailQuery, type MonName as MonNameType } from '../../store/pokemonApi'
import { Image } from '../Image/Image'
import { MonName } from '../MonName/MonName'
import { LevelBar } from '../LevelBar/LevelBar'
import { AttackBar } from '../AttackBar/AttackBar'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { reduceExp } from '../../store/gameSlice'
import { levelUp } from '../../store/deckSlice'
import { useLeveledMonQuery } from '../../game/useLeveledMon/useLeveledMon'
import { useBattle } from '../../game/Battle/useBattle'

interface Props {
  name: MonNameType
  level: number
}

export const TeamMember: FC<Props> = ({ name, level }) => {
  const dispatch = useAppDispatch()
  const [animate, setAnimate] = useState(false)
  const { data: monDetailData, isSuccess } = useMonDetailQuery(name)
  const { battleState } = useBattle()
  const leveledMonData = useLeveledMonQuery(name, level)
  const exp = useAppSelector(state => state.gameState.exp)

  if (!isSuccess || !leveledMonData) return null

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
        <AttackBar
          attackerLevel={level}
          attackerStats={leveledMonData.stats}
          attackerTypes={monDetailData.types}
          onCompleteCallback={() => setAnimate(true)}
          className={styles.attackBar}
        />
      )}
    </div>
  )
}
