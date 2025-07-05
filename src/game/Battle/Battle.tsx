import styles from './Battle.module.css'
import { useReducer, useState, useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useMonDetailQuery, type MonName } from '../../store/pokemonApi'
import { incrementKillCount } from '../../store/teamSlice'
import { Team } from '../Team/Team'
import { Enemy, type EnemyData } from '../Enemy/Enemy'

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

function getRandomItemFrom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export const Battle = () => {
  const [battleState, dispatchState] = useReducer(reducer, States.LOADING)
  const dispatch = useAppDispatch()
  const teamMemberData = useAppSelector(state => state.teamState[0])
  const { data: teamMonDetailData, isSuccess: teamMonDetailDataReady } = useMonDetailQuery(
    teamMemberData.name
  )

  const encounters = useAppSelector(state => state.runState.encounters)
  const newEnemy = useCallback(() => {
    return getRandomItemFrom(encounters)
  }, [encounters])
  const [enemyId, setEnemyId] = useState<MonName>(newEnemy())
  const { data: enemyMonDetailData, isSuccess: enemyMonDetailDataReady } =
    useMonDetailQuery(enemyId)
  const [enemyData, setEnemyData] = useState<EnemyData>({ health: 0, level: 1 })

  const attack = () => {
    setEnemyData(data => ({
      ...data,
      health: data.health - 5
    }))
  }

  useEffect(() => {
    if (battleState === States.ROLL_ENEMY) {
      setEnemyId(newEnemy())
      dispatchState(Actions.WAIT_FOR_DATA)
    }
    if (battleState === States.LOADING) {
      if (enemyMonDetailDataReady) {
        setEnemyData(data => ({
          ...data,
          health: enemyMonDetailData.hp
        }))
        dispatchState(Actions.START_BATTLE)
      }
    }
    if (battleState === States.GIVE_REWARDS) {
      dispatch(incrementKillCount())
      dispatchState(Actions.NEW_ENCOUNTER)
    }
  }, [battleState, newEnemy, dispatch, enemyMonDetailDataReady, enemyMonDetailData])

  useEffect(() => {
    if (enemyData.health <= 0) {
      dispatchState(Actions.BATTLE_WON)
    }
  }, [enemyData])

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
        <Enemy {...enemyMonDetailData} {...enemyData} />
      )}
    </div>
  )
}
