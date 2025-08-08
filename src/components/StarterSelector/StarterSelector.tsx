import styles from './StarterSelector.module.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useMonDetailQuery, type MonName } from '../../store/pokemonApi'
import { addToDeck, catchMon } from '../../store/deckSlice'
import { addToTeam } from '../../store/deckSlice'
import { incrementStageId } from '../../store/gameSlice'
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

  const chooseHandler = () => {
    if (!isSuccess) return

    dispatch(catchMon(name))
    dispatch(addToTeam(name))
    dispatch(incrementStageId())
  }

  return (
    <button onClick={chooseHandler} className={styles.button} disabled={!isSuccess}>
      <Image front sprites={data?.sprites} className={styles.image} />
      <MonNameComponent name={data?.name} className={styles.name} />
    </button>
  )
}
