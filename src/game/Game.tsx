import { useAppSelector } from '../store/store'
import { StarterSelector } from '../components/StarterSelector/StarterSelector'
import { Battle } from './Battle/Battle'

export const Game = () => {
  const event = useAppSelector(state => state.runState.event)

  if (event === 'STARTER') return <StarterSelector />
  if (event === 'BATTLE') return <Battle />
}
