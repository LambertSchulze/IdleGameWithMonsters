import styles from './Pokedex.module.css'
import { useAppSelector } from '../../store/store'

export const Pokedex = () => {
  const deck = useAppSelector(state => state.deckState)
  const knownMons = Object.values(deck)

  return (
    <dialog id="pokedex-dashboard" popover="auto" className={styles.component}>
      <h2>Pokedex</h2>
      <ol>
        {knownMons.map(mon => (
          <li key={mon.name}>
            {mon.name} - seen on {new Date(mon.spotted).toLocaleString()}
          </li>
        ))}
      </ol>
    </dialog>
  )
}
