import styles from './Battle.module.css'
import { useReducer, useEffect } from 'react'
import { useAppDispatch } from '../../store/store'
import { addToDeck } from '../../store/deckSlice'
import { addExp } from '../../store/gameSlice'
import { useStage } from '../Stage/useStage'
import { useDamageCalculator } from '../Damage/useDamageCalculator'
import { useTeam } from '../Team/useTeam'
import { useEnemy } from '../Enemy/useEnemy'
import { Team } from '../../components/Team/Team'
import { Enemy } from '../../components/Enemy/Enemy'

const States = {
  SETUP_BATTLE: 'SETUP_BATTLE',
  LOADING: 'LOADING',
  BATTLING: 'BATTLING',
  BATTLE_END: 'BATTLE_END'
} as const
export type BattleStateType = keyof typeof States

const Actions = {
  SETUP_NEW_BATTLE: 'SETUP_NEW_BATTLE',
  LOADING_FINISHED: 'LOADING_FINISHED',
  END_BATTLE: 'END_BATTLE'
} as const
type ActionType = keyof typeof Actions

const reducer = (_: BattleStateType, action: ActionType) => {
  switch (action) {
    case Actions.LOADING_FINISHED:
      return States.BATTLING
    case Actions.END_BATTLE:
      return States.BATTLE_END
    default:
      return States.LOADING
  }
}

export const Battle = () => {
  const [battleState, dispatchBattle] = useReducer(reducer, States.LOADING)
  const dispatch = useAppDispatch()
  const team = useTeam()
  const enemy = useEnemy()
  const { progressToNextStage } = useStage()
  const { damageCalculator } = useDamageCalculator()

  useEffect(() => {
    if (battleState === States.LOADING && team && enemy) {
      dispatch(addToDeck(enemy.name))
      dispatchBattle(Actions.LOADING_FINISHED)
    }
    if (battleState === States.BATTLE_END) {
      dispatch(addExp((enemy!.baseExp * enemy!.level) / 7))
      progressToNextStage()
    }
  }, [battleState, team, enemy, dispatch, dispatchBattle, progressToNextStage])

  useEffect(() => {
    if (enemy?.isFainted) {
      dispatchBattle(Actions.END_BATTLE)
    }
  }, [enemy])

  useEffect(() => {
    const interval = setInterval(() => {
      if (team && enemy && battleState === 'BATTLING') {
        enemy.addDamage(damageCalculator(team, enemy))
        return
      }
    }, 500)

    return () => clearInterval(interval)
  }, [team, enemy, damageCalculator, battleState])

  return (
    <div className={styles.container}>
      {team && <Team {...team} />}
      {battleState !== States.LOADING && enemy && <Enemy {...enemy} />}
    </div>
  )
}
