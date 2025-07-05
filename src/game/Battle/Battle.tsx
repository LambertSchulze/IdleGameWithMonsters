import { useReducer, useState, useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useMonDetailQuery, type MonDetailData } from '../../store/pokemonApi'
import { incrementKillCount, type TeamMember } from '../../store/teamSlice'

interface Enemy extends MonDetailData {
  level: number
  health: number
}

const States = {
  ROLL_ENEMY: 'ROLL_ENEMY',
  LOADING: 'LOADING',
  SETUP_ENEMY: 'SETUP_ENEMY',
  BATTLE: 'BATTLE',
  GIVE_REWARDS: 'GIVE_REWARDS'
} as const
type StateType = keyof typeof States

const Actions = {
  START_BATTLE: 'START_BATTLE',
  WAIT_FOR_DATA: 'WAIT_FOR_DATA',
  BATTLE_WON: 'BATTLE_WON',
  NEW_ENCOUNTER: 'NEW_ENCOUNTER'
} as const
type ActionType = keyof typeof Actions

function reducer(_: StateType, action: ActionType) {
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
  const team = useAppSelector(state => state.teamState[0])
  const encounters = useAppSelector(state => state.runState.encounters)
  const newEnemy = useCallback(() => {
    return encounters[Math.floor(Math.random() * encounters.length)]
  }, [encounters])
  const [enemyId, setEnemyId] = useState<number>(newEnemy())
  const { data: enemyData, isSuccess: dataLoaded } = useMonDetailQuery(enemyId)
  const [enemyHealth, setEnemyHealth] = useState<number>(0)

  const attack = () => {
    setEnemyHealth(health => health - 5)
  }

  useEffect(() => {
    if (battleState === States.ROLL_ENEMY) {
      setEnemyId(newEnemy())
      dispatchState(Actions.WAIT_FOR_DATA)
    }
    if (battleState === States.LOADING) {
      if (dataLoaded) {
        setEnemyHealth(enemyData.hp)
        dispatchState(Actions.START_BATTLE)
      }
    }
    if (battleState === States.GIVE_REWARDS) {
      dispatch(incrementKillCount())
      dispatchState(Actions.NEW_ENCOUNTER)
    }
  }, [battleState, newEnemy, dispatch, dataLoaded, enemyData])

  useEffect(() => {
    if (enemyHealth <= 0) {
      dispatchState(Actions.BATTLE_WON)
    }
  }, [enemyHealth])

  useEffect(() => {
    const interval = setInterval(() => {
      attack()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!team) return null

  return (
    <div>
      <Team member={team} attack={attack} />
      {battleState === States.BATTLE && dataLoaded && (
        <Enemy data={{ ...enemyData, level: 1, health: enemyHealth }} />
      )}
    </div>
  )
}

const Enemy = ({ data }: { data: Enemy }) => {
  return (
    <div>
      <img src={data.spriteFront} alt="" />
      <p>Lvl. 1 {data.name}</p>
      {data.health} <meter id="enemy_hp" min="0" max={data.hp} value={data.health}></meter>{' '}
      {data.hp}
    </div>
  )
}

const Team = ({ member, attack }: { member: TeamMember; attack: () => void }) => {
  const { data } = useMonDetailQuery(member.name)

  return (
    <div>
      <img src={data?.spriteBack} alt="" />
      <p>
        Lvl. {member.level} {member.name}
      </p>
      <button onClick={attack}>Attack!</button>
      <p>Kills: {member.kills}</p>
    </div>
  )
}
