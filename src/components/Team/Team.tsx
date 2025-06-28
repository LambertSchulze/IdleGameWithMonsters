import { useContext } from 'react'
import { BattleContext } from '../../game/BattleContext'

export const Team = () => {
  const { team } = useContext(BattleContext)

  return (
    <div>
      <img src={team.spriteBack} alt="" />
      <p>Lvl. 1 {team.name}</p>
      <button onClick={team.attack}>Attack</button>
    </div>
  )
}
