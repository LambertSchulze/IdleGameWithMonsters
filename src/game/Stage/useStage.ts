import { useCallback } from 'react'
import { incrementStageId } from '../../store/gameSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useEncounter } from '../Encounter/useEncounter'

export const useStage = () => {
  const stageId = useAppSelector(state => state.gameState.stageId)
  const dispatch = useAppDispatch()
  const [encounter, getNewEncounter] = useEncounter()

  const progressToNextStage = useCallback(() => {
    getNewEncounter()
    dispatch(incrementStageId())
  }, [dispatch, getNewEncounter])

  return {
    encounter,
    enemyLevel: stageId,
    progressToNextStage
  }
}
