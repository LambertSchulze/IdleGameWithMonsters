import { useAppSelector } from '../store/store'
import { BattleArena } from '../components/BattleArena/BattleArena'
import { StageProvider } from './Stage/StageContextProvider'
import { TeamProvider } from './Team/TeamContextProvider'

export const Game = () => {
  const stageId = useAppSelector(state => state.gameState.stageId)

  return (
    <TeamProvider>
      <StageProvider id={stageId}>
        <BattleArena />
      </StageProvider>
    </TeamProvider>
  )
}
