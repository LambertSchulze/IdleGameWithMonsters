import styles from './Battle.module.css'
import { useReducer, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useMonDetailQuery } from '../../store/pokemonApi'
import { incrementKillCount } from '../../store/teamSlice'
import { Team } from '../Team/Team'
import { Enemy } from '../Enemy/Enemy'
import { useEncounter } from '../Encounter/useEncounter'

const States = {
  ROLL_ENEMY: 'ROLL_ENEMY',
  LOADING: 'LOADING',
  SETUP_ENEMY: 'SETUP_ENEMY',
  BATTLE: 'BATTLE',
  GIVE_REWARDS: 'GIVE_REWARDS'
} as const
export type BattleStateType = keyof typeof States

const Actions = {
  START_BATTLE: 'START_BATTLE',
  WAIT_FOR_DATA: 'WAIT_FOR_DATA',
  BATTLE_WON: 'BATTLE_WON',
  NEW_ENCOUNTER: 'NEW_ENCOUNTER'
} as const
type ActionType = keyof typeof Actions

function reducer(_: BattleStateType, action: ActionType) {
  switch (action) {
    case Actions.START_BATTLE:
      return States.BATTLE
    case Actions.WAIT_FOR_DATA:
      return States.LOADING
    case Actions.BATTLE_WON:
      return States.GIVE_REWARDS
    case Actions.NEW_ENCOUNTER:
    default:
      return States.ROLL_ENEMY
  }
}

export const Battle = () => {
  const [battleState, dispatchState] = useReducer(reducer, States.LOADING)
  const dispatch = useAppDispatch()
  const teamMemberData = useAppSelector(state => state.teamState[0])
  const { data: teamMonDetailData, isSuccess: teamMonDetailDataReady } = useMonDetailQuery(
    teamMemberData.name
  )

  const { currentEncounter, getNewEncounter } = useEncounter()
  const { data: enemyMonDetailData, isSuccess: enemyMonDetailDataReady } =
    useMonDetailQuery(currentEncounter)
  const [damage, setDamage] = useState<number>(0)

  const attack = () => {
    setDamage(current => current + 5)
  }

  useEffect(() => {
    if (battleState === States.ROLL_ENEMY) {
      getNewEncounter()
      dispatchState(Actions.WAIT_FOR_DATA)
    }
    if (battleState === States.LOADING) {
      if (enemyMonDetailDataReady) {
        dispatchState(Actions.START_BATTLE)
      }
    }
    if (battleState === States.GIVE_REWARDS) {
      dispatch(incrementKillCount())
      dispatchState(Actions.NEW_ENCOUNTER)
    }
  }, [battleState, getNewEncounter, dispatch, enemyMonDetailDataReady, enemyMonDetailData])

  useEffect(() => {
    if (enemyMonDetailDataReady && enemyMonDetailData.hp <= damage) {
      dispatchState(Actions.BATTLE_WON)
    }
  }, [enemyMonDetailData, enemyMonDetailDataReady, damage])

  useEffect(() => {
    const interval = setInterval(() => {
      attack()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container}>
      {teamMemberData && teamMonDetailDataReady && (
        <Team {...teamMonDetailData} {...teamMemberData} />
      )}
      {battleState === States.BATTLE && enemyMonDetailDataReady && (
        <Enemy {...enemyMonDetailData} health={enemyMonDetailData.hp - damage} />
      )}
    </div>
  )
}
