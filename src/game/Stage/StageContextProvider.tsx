import { type PropsWithChildren, type FC } from 'react'
import { StageContext } from './StageContext'
import { useEncounter } from '../Encounter/useEncounter'
import { EnemyProvider } from '../Enemy/EnemyContextProvider'
import { useAppDispatch } from '../../store/store'
import { incrementStageId } from '../../store/gameSlice'
import { StarterSelector } from '../../components/StarterSelector/StarterSelector'

interface Props extends PropsWithChildren {
  id: number
}

export const StageProvider: FC<Props> = ({ id, children }) => {
  const dispatch = useAppDispatch()
  const encounter = useEncounter()

  const progressToNextStage = () => {
    dispatch(incrementStageId())
  }

  const context = {
    id,
    level: id,
    progressToNextStage
  }

  return (
    <StageContext.Provider value={context}>
      {id === 0 ? (
        <StarterSelector />
      ) : (
        encounter && (
          <EnemyProvider monName={encounter} level={id} key={id}>
            {children}
          </EnemyProvider>
        )
      )}
    </StageContext.Provider>
  )
}
