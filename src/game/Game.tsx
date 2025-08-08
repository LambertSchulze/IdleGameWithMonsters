import { useAppSelector } from '../store/store'
import { BattleArena } from '../components/BattleArena/BattleArena'
import { StageProvider } from './Stage/StageContextProvider'

export const Game = () => {
  const stageId = useAppSelector(state => state.gameState.stageId)

  return (
    <StageProvider id={stageId}>
      <BattleArena />
    </StageProvider>
  )
}
