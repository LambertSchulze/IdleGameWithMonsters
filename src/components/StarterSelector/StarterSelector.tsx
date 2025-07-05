import styles from './StarterSelector.module.css'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useMonDetailQuery, type MonName } from '../../store/pokemonApi'
import { addToTeam } from '../../store/teamSlice'
import { setEventToBattle } from '../../store/runSlice'

export const StarterSelector = () => {
  const starters = useAppSelector(state => state.runState.starterMons)

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

    dispatch(addToTeam({ name, level: 1, kills: 0 }))
    dispatch(setEventToBattle())
  }

  return (
    <button onClick={choose} className={styles.button} disabled={!isSuccess}>
      <img src={data?.spriteFront} alt="" width={96} height={96} className={styles.image} />
      <p className={styles.name}>{data?.name ?? '???'}</p>
    </button>
  )
}
