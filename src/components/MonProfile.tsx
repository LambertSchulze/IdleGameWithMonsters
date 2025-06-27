import { useMonDetailQuery } from '../services/pokemonApi'

export const MonProfile = ({ id }: { id: number }) => {
  const { data, isLoading, isError, isUninitialized } = useMonDetailQuery(id)

  if (isLoading || isError || isUninitialized) return '...'

  return (
    <div>
      <img src={data.spriteFront} alt={`Image of ${data.name}`} />
      <p>{data.name}</p>
    </div>
  )
}
