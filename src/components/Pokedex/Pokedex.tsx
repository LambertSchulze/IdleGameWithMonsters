import styles from './Pokedex.module.css'
import { useAppSelector } from '../../store/store'
import { Entry } from './Entry/Entry'
import { usePokedexQuery } from '../../store/pokemonApi'

export const Pokedex = () => {
  const deck = useAppSelector(state => state.deckState)
  const { data: pokedex, isSuccess } = usePokedexQuery(2)

  if (!isSuccess) return

  return (
    <dialog id="pokedex-dashboard" popover="auto" className={styles.component}>
      <h2>Pokedex</h2>
      <div className={styles.container}>
        {pokedex.entries.map(entry => {
          return deck[entry.name] ? <Entry key={entry.id} {...deck[entry.name]} /> : <p>???</p>
        })}
      </div>
    </dialog>
  )
}
