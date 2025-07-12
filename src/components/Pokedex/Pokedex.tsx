import styles from './Pokedex.module.css'
import { useAppSelector } from '../../store/store'
import { Entry } from './Entry/Entry'
import { usePokedexQuery } from '../../store/pokemonApi'
import type { MonName, PokedexEntry } from '../../store/pokemonApi'

export const Pokedex = () => {
  const deck = useAppSelector(state => state.deckState)
  const { data: pokedex, isSuccess } = usePokedexQuery(2)

  if (!isSuccess) return

  const seenMons = Object.keys(deck) as MonName[]
  const seenMonIds = seenMons.map(name => pokedex[name].id)
  const highestSeenMon = Math.max(...seenMonIds)

  const slicedPokedex: PokedexEntry[] = Object.values(pokedex).filter(
    mon => mon.id <= highestSeenMon
  )

  return (
    <dialog id="pokedex-dashboard" popover="auto" className={styles.component}>
      <h2>Pokedex</h2>
      <div className={styles.container}>
        {slicedPokedex.map(entry => (
          <Entry key={entry.id} {...deck[entry.name]} />
        ))}
      </div>
    </dialog>
  )
}
