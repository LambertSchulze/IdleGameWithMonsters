import { useAppSelector } from '../../store/store'
import styles from './TotalExp.module.css'

export const TotalExp = () => {
  const exp = useAppSelector(state => state.gameState.exp)
  const displayedExp = new Intl.NumberFormat('no', {
    notation: exp > 999999 ? 'compact' : 'standard',
    minimumFractionDigits: exp > 999999 ? 3 : 0,
    compactDisplay: 'long'
  }).format(exp)

  return (
    <div className={styles.component}>
      {displayedExp}
      <span className={styles.unit}>&nbsp;EXP</span>
    </div>
  )
}
