import styles from './StarterSelector.module.css'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useMonDetailQuery } from '../../store/pokemonApi'
import { addToTeam } from '../../store/teamSlice'
import { setEventToBattle } from '../../store/runSlice'

export const StarterSelector = () => {
  const starters = useAppSelector(state => state.runState.starterMons)

  return (
    <div>
      <h2 className={styles.heading}>Select your Starter Mon</h2>
      <div className={styles.startersContainer}>
        {starters.map(id => (
          <MonProfile key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

const MonProfile = ({ id }: { id: number }) => {
  const { data, isSuccess } = useMonDetailQuery(id)
  const dispatch = useAppDispatch()

  const choose = () => {
    if (!isSuccess) return

    dispatch(addToTeam({ ...data, level: 1, kills: 0 }))
    dispatch(setEventToBattle())
  }

  return (
    <div>
      <img src={data?.spriteFront} alt="" width={96} height={96} className={styles.profileImage} />
      <button onClick={choose} className={styles.profileButton}>
        {data?.name ?? '???'}
      </button>
    </div>
  )
}
