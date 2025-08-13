import { type FC, type PropsWithChildren, useReducer, useState, useEffect } from 'react'
import { BattleContext, BattleState } from './BattleContext'
import { useAppDispatch } from '../../store/store'
import { useEnemy } from '../Enemy/useEnemy'
import { useStage } from '../Stage/useStage'
import { useDamageCalculator } from '../Damage/useDamageCalculator'
import type { MonTypes, Stats, TypeDetailData } from '../../store/pokemonApi'
import { addToDeck, catchMon } from '../../store/deckSlice'
import { addExp } from '../../store/gameSlice'

const Action = {
  SETUP_NEW_BATTLE: 'SETUP_NEW_BATTLE',
  LOADING_FINISHED: 'LOADING_FINISHED',
  CATCH_ENEMY: 'CATCH_ENEMY',
  END_BATTLE: 'END_BATTLE'
} as const
type ActionType = keyof typeof Action

const reducer = (_: unknown, action: ActionType): BattleState => {
  switch (action) {
    case Action.LOADING_FINISHED:
      return BattleState.BATTLING
    case Action.CATCH_ENEMY:
      return BattleState.CATCHING
    case Action.END_BATTLE:
      return BattleState.BATTLE_END
    default:
      return BattleState.SETUP_BATTLE
  }
}

export const BattleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [battleState, dispatchBattleState] = useReducer(reducer, BattleState.SETUP_BATTLE)
  const [damage, setDamage] = useState(0)
  const dispatch = useAppDispatch()
  const enemy = useEnemy()
  const { progressToNextStage } = useStage()
  const { damageCalculator } = useDamageCalculator()

  const attackCallback = (
    attackerLvl: number,
    attackerStats: Stats,
    attackerTypes: MonTypes,
    attackPower: number,
    attackType: TypeDetailData
  ) => {
    if (enemy)
      setDamage(
        damage +
          damageCalculator(
            attackerLvl,
            attackerStats,
            attackerTypes,
            attackPower,
            attackType,
            enemy
          )
      )
  }

  const catchCallback = () => {
    dispatchBattleState(Action.CATCH_ENEMY)
  }

  useEffect(() => {
    if (!enemy) return

    switch (battleState) {
      case 'SETUP_BATTLE': {
        dispatch(addToDeck(enemy.name))
        const interval = setInterval(() => {
          dispatchBattleState(Action.LOADING_FINISHED)
        }, 1500)
        return () => clearInterval(interval)
      }
      case 'BATTLING': {
        if (damage >= enemy?.stats.hp) dispatchBattleState(Action.END_BATTLE)
        break
      }
      case 'CATCHING': {
        const interval = setInterval(() => {
          dispatch(catchMon(enemy.name))
          progressToNextStage()
        }, 3000)
        return () => clearInterval(interval)
      }
      case 'BATTLE_END': {
        const interval = setInterval(() => {
          dispatch(addExp((enemy.baseExp * enemy.level) / 7))
          progressToNextStage()
        }, 1500)
        return () => clearInterval(interval)
      }
    }
  }, [enemy, battleState, damage, dispatch, progressToNextStage])

  return (
    <BattleContext.Provider value={{ battleState, attackCallback, catchCallback, damage }}>
      {children}
    </BattleContext.Provider>
  )
}
