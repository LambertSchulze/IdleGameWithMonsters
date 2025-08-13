import styles from './AttackBar.module.css'
import { type FC } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { toClassName } from '../../helpers/toClassNames'
import {
  type MonTypes,
  type MoveName,
  type Stats,
  useMoveDetailQuery,
  useTypeDetailQuery
} from '../../store/pokemonApi'
import { CountdownBar } from '../CountdownBar/CountdownBar'
import { useBattle } from '../../game/Battle/useBattle'

interface Props {
  attackerLevel: number
  attackerStats: Stats
  attackerTypes: MonTypes
  onCompleteCallback: () => void
  className?: string
}

export const AttackBar: FC<Props> = ({
  attackerLevel,
  attackerStats,
  attackerTypes,
  onCompleteCallback,
  className
}) => {
  const { data: moveData, isSuccess: moveIsSuccess } = useMoveDetailQuery('Tackle' as MoveName)
  const { data: typeData, isSuccess: typeIsSuccess } = useTypeDetailQuery(
    moveIsSuccess ? moveData.type : skipToken
  )
  const { attackCallback } = useBattle()

  if (!moveIsSuccess || !typeIsSuccess) return null

  return (
    <div className={toClassName(className, styles.component)}>
      {moveData.name}
      <CountdownBar
        durationInMS={Math.max(3000 - attackerStats.speed * 100, 100)}
        onComplete={() => {
          onCompleteCallback()
          attackCallback(attackerLevel, attackerStats, attackerTypes, moveData.power, typeData)
        }}
        className={styles.countdown}
      />
    </div>
  )
}
