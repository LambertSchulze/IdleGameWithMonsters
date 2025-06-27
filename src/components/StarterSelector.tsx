import { MonProfile } from './MonProfile'

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
