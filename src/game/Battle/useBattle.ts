import { useReducer, useEffect, useCallback } from 'react'
import { useAppDispatch } from '../../store/store'
import { addToDeck } from '../../store/deckSlice'
import { addExp } from '../../store/gameSlice'
import { useStage } from '../Stage/useStage'
import { useDamageCalculator } from '../Damage/useDamageCalculator'
import { useTeam } from '../Team/useTeam'
import { useEnemy } from '../Enemy/useEnemy'

const State = {
  SETUP_BATTLE: 'SETUP_BATTLE',
  LOADING: 'LOADING',
  BATTLING: 'BATTLING',
  BATTLE_END: 'BATTLE_END'
} as const
export type BattleStateType = keyof typeof State

const Action = {
  SETUP_NEW_BATTLE: 'SETUP_NEW_BATTLE',
  LOADING_FINISHED: 'LOADING_FINISHED',
  END_BATTLE: 'END_BATTLE'
} as const
type ActionType = keyof typeof Action

const reducer = (_: BattleStateType, action: ActionType) => {
  switch (action) {
    case Action.LOADING_FINISHED:
      return State.BATTLING
    case Action.END_BATTLE:
      return State.BATTLE_END
    default:
      return State.SETUP_BATTLE
  }
}

export const useBattle = () => {
  const [battleState, dispatchBattle] = useReducer(reducer, State.SETUP_BATTLE)
  const dispatch = useAppDispatch()
  const team = useTeam()
  const enemy = useEnemy()
  const { progressToNextStage } = useStage()
  const { damageCalculator } = useDamageCalculator()

  const attackCallback = useCallback(
    () => enemy?.addDamage(damageCalculator(team!, enemy)),
    [enemy, team, damageCalculator]
  )

  useEffect(() => {
    if (battleState === State.SETUP_BATTLE && team && enemy) {
      dispatch(addToDeck(enemy.name))

      const interval = setInterval(() => {
        dispatchBattle(Action.LOADING_FINISHED)
      }, 1500)
      return () => clearInterval(interval)
    }
    if (battleState === State.BATTLE_END) {
      const interval = setInterval(() => {
        dispatch(addExp((enemy!.baseExp * enemy!.level) / 7))
        progressToNextStage()
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [battleState, team, enemy, dispatch, dispatchBattle, progressToNextStage])

  useEffect(() => {
    if (enemy?.isFainted) {
      dispatchBattle(Action.END_BATTLE)
    }
  }, [enemy])

  return {
    team,
    enemy,
    battleState,
    attackCallback
  }
}
