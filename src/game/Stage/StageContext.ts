import { createContext } from 'react'

export interface Stage {
  id: number
  enemyLevel?: number
  progressToNextStage: () => void
}

export const StageContext = createContext<Stage>({
  id: 0,
  progressToNextStage: () => null
})
