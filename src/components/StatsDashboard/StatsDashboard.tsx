import styles from './StatsDashboard.module.css'
import { useAppSelector } from '../../store/store'

export const StatsDashboard = () => {
  const runState = useAppSelector(state => state.gameState)

  return (
    <dialog id="stats-dashboard" popover="auto" className={styles.component}>
      <h2>Stats</h2>
      <dl>
        <dt>Starters:</dt>
        <dd>{runState.starterMons.join(' or ')}</dd>

        <dt>Enemies:</dt>
        <dd>{runState.encounters.join(' or ')}</dd>
      </dl>
    </dialog>
  )
}
