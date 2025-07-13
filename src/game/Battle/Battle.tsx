import styles from './Battle.module.css'
import { useReducer, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useMonDetailQuery, type MoveName } from '../../store/pokemonApi'
import { addToDeck } from '../../store/deckSlice'
import { addExp } from '../../store/gameSlice'
import { useStage } from '../Stage/useStage'
import { useDamageCalculator } from '../Damage/damageCalculator'
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
  const [battleState, dispatchState] = useReducer(reducer, States.LOADING)
  const dispatch = useAppDispatch()
  const teamMemberData = useAppSelector(state => state.teamState[0])
  const { data: teamMonDetailData, isSuccess: teamMonDetailDataReady } = useMonDetailQuery(
    teamMemberData.name
  )

  const { encounter, enemyLevel, progressToNextStage } = useStage()
  const { data: enemyMonDetailData, isSuccess: enemyMonDetailDataReady } =
    useMonDetailQuery(encounter)

  const { damageCalculator } = useDamageCalculator()
  const [damage, setDamage] = useState(0)

  useEffect(() => {
    if (battleState === States.LOADING && teamMonDetailDataReady && enemyMonDetailDataReady) {
      dispatch(addToDeck(enemyMonDetailData.name))
      setDamage(0)
      dispatchState(Actions.LOADING_FINISHED)
    }
    if (battleState === States.BATTLE_END) {
      dispatch(addExp((enemyMonDetailData!.baseExp * enemyLevel) / 7))
      progressToNextStage()
    }
  }, [
    battleState,
    teamMonDetailDataReady,
    enemyMonDetailDataReady,
    enemyMonDetailData,
    dispatch,
    dispatchState,
    setDamage,
    progressToNextStage
  ])

  useEffect(() => {
    if (enemyMonDetailDataReady && enemyHp(enemyMonDetailData.stats.hp, enemyLevel) <= damage) {
      dispatchState(Actions.END_BATTLE)
    }
  }, [enemyMonDetailData, enemyMonDetailDataReady, damage, enemyLevel])

  useEffect(() => {
    const interval = setInterval(() => {
      if (teamMonDetailData && enemyMonDetailData && battleState === 'BATTLING') {
        const attack = damageCalculator(teamMonDetailData, enemyMonDetailData, {
          power: 50,
          name: 'exampleMove' as MoveName,
          type: 'normal',
          damageClass: 'physical'
        })
        setDamage(damage => damage + attack)
        return
      }
    }, 500)

    return () => clearInterval(interval)
  }, [teamMonDetailData, enemyMonDetailData, damageCalculator, battleState])

  const enemyHp = (baseHp: number, level: number) =>
    Math.floor((baseHp * 2 * level) / 100 + level + 10)

  return (
    <div className={styles.container}>
      {teamMemberData && teamMonDetailDataReady && (
        <Team {...teamMonDetailData} {...teamMemberData} />
      )}
      {battleState !== States.LOADING && enemyMonDetailDataReady && (
        <Enemy
          {...enemyMonDetailData}
          health={Math.max(enemyHp(enemyMonDetailData.stats.hp, enemyLevel) - damage, 0)}
          maxHp={enemyHp(enemyMonDetailData.stats.hp, enemyLevel)}
          level={enemyLevel}
        />
      )}
    </div>
  )
}
