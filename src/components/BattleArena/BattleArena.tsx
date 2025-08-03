import styles from './BattleArena.module.css'
import { useBattle } from '../../game/Battle/useBattle'
import { useTeam } from '../../game/Team/useTeam'
import { Team } from '../Team/Team'
import { Enemy } from '../Enemy/Enemy'

export const BattleArena = () => {
  const { enemy, battleState, attackCallback, caught, isCatchable, catchCallback } = useBattle()
  const team = useTeam()

  return (
    <div className={styles.container}>
      {team && <Team {...team} battleState={battleState} attackCallback={attackCallback} />}
      {enemy && (
        <Enemy
          {...enemy}
          battleState={battleState}
          caught={caught}
          isCatchable={isCatchable}
          catchCallback={catchCallback}
        />
      )}
    </div>
  )
}
