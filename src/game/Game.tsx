import { BattleScene } from '../components/BattleScene/BattleScene'
import { BattleProvider } from './BattleContextProvider'
import { useAppSelector } from '../store/store'
import { StarterSelector } from '../components/StarterSelector'

export const Game = () => {
  const runState = useAppSelector(state => state.runState)

  if (runState.team.length === 0) return <StarterSelector starters={runState.starterMons} />

  return (
    <BattleProvider enemy={16}>
      <BattleScene />
    </BattleProvider>
  )
}
