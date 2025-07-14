import { useAppSelector } from '../store/store'
import { Battle } from './Battle/Battle'
import { StageProvider } from './Stage/StageContextProvider'
import { TeamProvider } from './Team/TeamContextProvider'

export const Game = () => {
  const stageId = useAppSelector(state => state.gameState.stageId)

  return (
    <TeamProvider>
      <StageProvider id={stageId}>
        <Battle key={stageId} />
      </StageProvider>
    </TeamProvider>
  )
}
