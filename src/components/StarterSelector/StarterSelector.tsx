import styles from './StarterSelector.module.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useMonDetailQuery, type MonName, type MoveName } from '../../store/pokemonApi'
import { addToDeck, captureMon } from '../../store/deckSlice'
import { addToTeam } from '../../store/teamSlice'
import { setEventToBattle } from '../../store/gameSlice'
import { Image } from '../Image/Image'
import { MonName as MonNameComponent } from '../MonName/MonName'

export const StarterSelector = () => {
  const starters = useAppSelector(state => state.gameState.starterMons)
  const dispatch = useAppDispatch()

  useEffect(() => {
    starters.forEach(name => {
      dispatch(addToDeck(name))
    })
  }, [starters, dispatch])

  return (
    <div>
      <h2 className={styles.heading}>Select your Starter</h2>
      <div className={styles.container}>
        {starters.map(name => (
          <Starter key={name} name={name} />
        ))}
      </div>
    </div>
  )
}

const Starter = ({ name }: { name: MonName }) => {
  const { data, isSuccess } = useMonDetailQuery(name)
  const dispatch = useAppDispatch()

  const choose = () => {
    if (!isSuccess) return

    dispatch(captureMon(name))
    dispatch(addToTeam({ name, attack: 'Tackle' as MoveName }))
    dispatch(setEventToBattle())
  }

  return (
    <button onClick={choose} className={styles.button} disabled={!isSuccess}>
      <Image front sprites={data?.sprites} className={styles.image} />
      <MonNameComponent name={data?.name} className={styles.name} />
    </button>
  )
}
