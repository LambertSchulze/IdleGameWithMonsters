import styles from './BattleArena.module.css'
import { useAppSelector } from '../../store/store'
import { teamMembers } from '../../store/deckSlice'
import { TeamMember } from '../TeamMember/TeamMember'
import { Enemy } from '../Enemy/Enemy'
import { useEnemy } from '../../game/Enemy/useEnemy'
import { BattleProvider } from '../../game/Battle/BattleContextProvider'

export const BattleArena = () => {
  const enemy = useEnemy()
  const team = useAppSelector(teamMembers)

  return (
    <BattleProvider>
      <div className={styles.container}>
        <div>
          {team.map(member => (
            <TeamMember key={member.name} name={member.name} level={member.level} />
          ))}
        </div>
        {enemy && <Enemy {...enemy} />}
      </div>
    </BattleProvider>
  )
}
