import { type FC, type PropsWithChildren } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { TeamContext } from './TeamContext'
import { useAppSelector } from '../../store/store'
import { useMonDetailQuery } from '../../store/pokemonApi'
import { useMoveDetailQuery } from '../../store/pokemonApi'
import { useTypeDetailQuery } from '../../store/pokemonApi'

export const TeamProvider: FC<PropsWithChildren> = ({ children }) => {
  const teamState = useAppSelector(state => state.teamState)
  const teamDetailResponse = useMonDetailQuery(teamState[0].name ?? skipToken)
  const selectedMoveDetailResponse = useMoveDetailQuery(teamState[0].attack ?? skipToken)
  const moveTypeDetailResponse = useTypeDetailQuery(
    selectedMoveDetailResponse.isSuccess ? selectedMoveDetailResponse.data.type : skipToken
  )
  let team = null

  if (
    teamDetailResponse.isSuccess &&
    selectedMoveDetailResponse.isSuccess &&
    moveTypeDetailResponse.isSuccess
  ) {
    team = {
      ...teamDetailResponse.data,
      attack: {
        ...selectedMoveDetailResponse.data,
        type: moveTypeDetailResponse.data
      }
    }
  }

  return <TeamContext.Provider value={team}>{children}</TeamContext.Provider>
}
