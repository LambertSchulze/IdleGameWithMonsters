import styles from './AttackBar.module.css'
import { type FC } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { toClassName } from '../../helpers/toClassNames'
import {
  type MoveName,
  type TypeDetailData,
  useMoveDetailQuery,
  useTypeDetailQuery
} from '../../store/pokemonApi'
import { CountdownBar } from '../CountdownBar/CountdownBar'

interface Props {
  speedStat: number
  attackCallback: (power: number, type: TypeDetailData) => void
  className?: string
}

export const AttackBar: FC<Props> = ({ speedStat, attackCallback, className }) => {
  const { data: moveData, isSuccess: moveIsSuccess } = useMoveDetailQuery('Tackle' as MoveName)
  const { data: typeData, isSuccess: typeIsSuccess } = useTypeDetailQuery(
    moveIsSuccess ? moveData.type : skipToken
  )

  if (!moveIsSuccess || !typeIsSuccess) return null

  return (
    <div className={toClassName(className, styles.component)}>
      {moveData.name}
      <CountdownBar
        durationInMS={Math.max(3000 - speedStat * 100, 100)}
        onComplete={() => attackCallback(moveData.power, typeData)}
        className={styles.countdown}
      />
    </div>
  )
}
