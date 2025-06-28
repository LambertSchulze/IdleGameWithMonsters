import { useMonDetailQuery } from '../store/pokemonApi'
import { addToTeam } from '../store/runSlice'
import { useAppDispatch } from '../store/store'

export const StarterSelector = ({ starters }: { starters: number[] }) => {
  return (
    <dialog open>
      Select your Starter Mon:
      {starters.map(id => (
        <MonProfile key={id} id={id} />
      ))}
    </dialog>
  )
}

const MonProfile = ({ id }: { id: number }) => {
  const { data } = useMonDetailQuery(id)
  const dispatch = useAppDispatch()
  const choose = (id: number) => {
    dispatch(addToTeam(id))
  }

  return (
    <div>
      <img src={data?.spriteFront} alt="" width={96} height={96} />
      <button onClick={() => choose(id)}>{data?.name ?? '???'}</button>
    </div>
  )
}
