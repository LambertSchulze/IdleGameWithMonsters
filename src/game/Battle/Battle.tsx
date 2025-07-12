import styles from './Battle.module.css'
import { useReducer, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { addToDeck } from '../../store/deckSlice'
import { useMonDetailQuery, type MoveName } from '../../store/pokemonApi'
import { Team } from '../../components/Team/Team'
import { Enemy } from '../../components/Enemy/Enemy'
import { useEncounter } from '../Encounter/useEncounter'
import { useDamageCalculator } from '../Damage/damageCalculator'
import { addExp } from '../../store/gameSlice'

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
  const { damageCalculator } = useDamageCalculator()
  const [damage, setDamage] = useState(0)

  useEffect(() => {
    if (battleState === States.ROLL_ENEMY) {
      getNewEncounter()
      dispatch(addToDeck(currentEncounter))
      setDamage(0)
      dispatchState(Actions.WAIT_FOR_DATA)
    }
    if (battleState === States.LOADING) {
      if (enemyMonDetailDataReady) {
        dispatchState(Actions.START_BATTLE)
      }
    }
    if (battleState === States.GIVE_REWARDS) {
      if (enemyMonDetailDataReady) {
        dispatch(addExp(enemyMonDetailData.baseExp))
        dispatchState(Actions.NEW_ENCOUNTER)
      }
    }
  }, [
    battleState,
    getNewEncounter,
    dispatch,
    enemyMonDetailDataReady,
    enemyMonDetailData,
    currentEncounter
  ])

  useEffect(() => {
    if (enemyMonDetailDataReady && enemyMonDetailData.stats.hp <= damage) {
      dispatchState(Actions.BATTLE_WON)
    }
  }, [enemyMonDetailData, enemyMonDetailDataReady, damage])

  useEffect(() => {
    const interval = setInterval(() => {
      if (teamMonDetailData && enemyMonDetailData) {
        setDamage(
          damage =>
            damage +
            damageCalculator(teamMonDetailData, enemyMonDetailData, {
              power: 50,
              name: 'exampleMove' as MoveName,
              type: 'normal',
              damageClass: 'physical'
            })
        )
        return
      }
    }, 500)

    return () => clearInterval(interval)
  }, [teamMonDetailData, enemyMonDetailData, damageCalculator])

  return (
    <div className={styles.container}>
      {teamMemberData && teamMonDetailDataReady && (
        <Team {...teamMonDetailData} {...teamMemberData} />
      )}
      {battleState === States.BATTLE && enemyMonDetailDataReady && (
        <Enemy {...enemyMonDetailData} health={enemyMonDetailData.stats.hp - damage} />
      )}
    </div>
  )
}
