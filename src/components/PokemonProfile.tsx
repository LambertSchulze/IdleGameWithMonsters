import { usePokemonDetailQuery } from '../services/pokemon'

export const PokemonProfile = ({ id }: { id: number }) => {
  const { data, isLoading, isError, isUninitialized } = usePokemonDetailQuery(id)

  if (isLoading || isError || isUninitialized) return '...'

  return (
    <div>
      <img src={data.sprite} alt={`Image of ${data.name}`} />
      <p>{data.name}</p>
    </div>
  )
}
