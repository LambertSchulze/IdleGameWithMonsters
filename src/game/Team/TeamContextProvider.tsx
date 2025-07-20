import { type FC, type PropsWithChildren, useState, useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { type Team, TeamContext } from './TeamContext'
import { useAppSelector } from '../../store/store'
import { useMonDetailQuery } from '../../store/pokemonApi'
import { useMoveDetailQuery } from '../../store/pokemonApi'
import { useTypeDetailQuery } from '../../store/pokemonApi'

export const TeamProvider: FC<PropsWithChildren> = ({ children }) => {
  const teamState = useAppSelector(state => state.teamState)
  const [teamData, setTeamData] = useState<Team | null>(null)
  const teamDetailResponse = useMonDetailQuery(teamState[0]?.name ?? skipToken)
  const selectedMoveDetailResponse = useMoveDetailQuery(teamState[0]?.attack ?? skipToken)
  const moveTypeDetailResponse = useTypeDetailQuery(
    selectedMoveDetailResponse.isSuccess ? selectedMoveDetailResponse.data.type : skipToken
  )

  useEffect(() => {
    if (
      teamDetailResponse.isSuccess &&
      selectedMoveDetailResponse.isSuccess &&
      moveTypeDetailResponse.isSuccess
    ) {
      setTeamData({
        ...teamDetailResponse.data,
        attack: {
          ...selectedMoveDetailResponse.data,
          type: moveTypeDetailResponse.data
        }
      })
    }
  }, [teamState, teamDetailResponse, selectedMoveDetailResponse, moveTypeDetailResponse])

  return <TeamContext.Provider value={teamData}>{children}</TeamContext.Provider>
}
