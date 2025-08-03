import styles from './BattleArena.module.css'
import { useBattle } from '../../game/Battle/useBattle'
import { TeamMember } from '../TeamMember/TeamMember'
import { Enemy } from '../Enemy/Enemy'
import { useAppSelector } from '../../store/store'
import { teamMembers } from '../../store/deckSlice'

export const BattleArena = () => {
  const { enemy, battleState, attackCallback, caught, isCatchable, catchCallback } = useBattle()
  const team = useAppSelector(teamMembers)

  return (
    <div className={styles.container}>
      {team.map(member => (
        <TeamMember
          key={member.name}
          name={member.name}
          level={member.level}
          battleState={battleState}
          attackCallback={attackCallback}
        />
      ))}
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
