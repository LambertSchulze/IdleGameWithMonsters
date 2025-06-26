import { PokemonProfile } from './PokemonProfile'

export const StarterSelector = ({ starters }: { starters: number[] }) => {
  return (
    <dialog open>
      Select your Starter:
      {starters.map(id => (
        <PokemonProfile key={id} id={id} />
      ))}
    </dialog>
  )
}
