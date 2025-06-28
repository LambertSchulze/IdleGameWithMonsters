import { Enemy } from '../Enemy/Enemy'
import { Team } from '../Team/Team'
import styles from './BattleScene.module.css'

export const BattleScene = () => {
  return (
    <div className={styles.container}>
      <Team />
      <Enemy />
    </div>
  )
}
