import { useContext } from 'react'
import { BattleContext } from '../../game/BattleContext'
import styles from './BattleScene.module.css'

export const BattleScene = () => {
  const { team, enemy } = useContext(BattleContext)

  return (
    <div className={styles.container}>
      <MonFighting name={team.name} spriteBack={team.spriteBack} attack={team.attack} />
      <Enemy
        name={enemy.name}
        spriteFront={enemy.spriteFront}
        hp={enemy.hp}
        health={enemy.health}
      />
    </div>
  )
}

const MonFighting = ({
  name,
  spriteBack,
  attack
}: {
  name: string
  spriteBack: string
  attack: () => void
}) => {
  return (
    <div>
      <img src={spriteBack} alt="" />
      <p>{name}</p>
      <button onClick={attack}>Attack</button>
    </div>
  )
}

const Enemy = ({
  name,
  spriteFront,
  hp,
  health
}: {
  name: string
  spriteFront: string
  hp: number
  health: number
}) => {
  return (
    <div>
      <img src={spriteFront} alt="" />
      <p>{name}</p>
      {health} <meter id="enemy_hp" min="0" max={hp} value={health}></meter> {hp}
    </div>
  )
}
