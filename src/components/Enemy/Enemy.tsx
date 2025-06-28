import { useContext } from 'react'
import { BattleContext } from '../../game/BattleContext'

export const Enemy = () => {
  const { enemy } = useContext(BattleContext)

  return (
    <div>
      <img src={enemy.spriteFront} alt="" />
      <p>Lvl. 1 {enemy.name}</p>
      {enemy.health} <meter id="enemy_hp" min="0" max={enemy.hp} value={enemy.health}></meter>{' '}
      {enemy.hp}
    </div>
  )
}
