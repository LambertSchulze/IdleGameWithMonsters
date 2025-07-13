import { useAppSelector } from '../store/store'
import { StarterSelector } from '../components/StarterSelector/StarterSelector'
import { Battle } from './Battle/Battle'

export const Game = () => {
  const stageId = useAppSelector(state => state.gameState.stageId)

  if (stageId === 0) {
    return <StarterSelector />
  } else {
    return <Battle key={stageId} />
  }
}
