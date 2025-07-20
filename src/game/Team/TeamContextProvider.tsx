import { type FC, type PropsWithChildren, useState, useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { type Team, TeamContext } from './TeamContext'
import { useAppSelector } from '../../store/store'
import {
  useMonDetailQuery,
  useMoveDetailQuery,
  useTypeDetailQuery,
  useSpeciesDetailQuery
} from '../../store/pokemonApi'
import { getGrowthRate } from '../GrowthRate/getGrowthRate'

export const TeamProvider: FC<PropsWithChildren> = ({ children }) => {
  const teamState = useAppSelector(state => state.teamState)
  const [teamData, setTeamData] = useState<Team | null>(null)
  const teamDetailResponse = useMonDetailQuery(teamState[0]?.name ?? skipToken)
  const selectedMoveDetailResponse = useMoveDetailQuery(teamState[0]?.attack ?? skipToken)
  const moveTypeDetailResponse = useTypeDetailQuery(
    selectedMoveDetailResponse.isSuccess ? selectedMoveDetailResponse.data.type : skipToken
  )
  const speciesDetailResponse = useSpeciesDetailQuery(
    teamDetailResponse.isSuccess ? teamDetailResponse.data.species : skipToken
  )

  useEffect(() => {
    if (
      teamDetailResponse.isSuccess &&
      selectedMoveDetailResponse.isSuccess &&
      moveTypeDetailResponse.isSuccess &&
      speciesDetailResponse.isSuccess
    ) {
      setTeamData({
        ...teamDetailResponse.data,
        attack: {
          ...selectedMoveDetailResponse.data,
          type: moveTypeDetailResponse.data
        },
        expAtLvl: getGrowthRate(speciesDetailResponse.data.growthRate)
      })
    }
  }, [
    teamState,
    teamDetailResponse,
    selectedMoveDetailResponse,
    moveTypeDetailResponse,
    speciesDetailResponse
  ])

  return <TeamContext.Provider value={teamData}>{children}</TeamContext.Provider>
}
