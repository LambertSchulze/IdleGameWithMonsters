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
import { getStats } from '../Stats/getStats'

export const TeamProvider: FC<PropsWithChildren> = ({ children }) => {
  const [teamData, setTeamData] = useState<Team | null>(null)
  const teamState = useAppSelector(state => state.teamState)
  const teamLevel = useAppSelector(state => {
    if (teamState[0]) {
      return state.deckState[teamState[0].name].level
    }
  })
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
      teamLevel &&
      teamDetailResponse.isSuccess &&
      selectedMoveDetailResponse.isSuccess &&
      moveTypeDetailResponse.isSuccess &&
      speciesDetailResponse.isSuccess
    ) {
      const growthRate = getGrowthRate(speciesDetailResponse.data.growthRate)

      setTeamData({
        ...teamDetailResponse.data,
        level: teamLevel,
        stats: getStats(teamDetailResponse.data.baseStats, teamLevel),
        attack: {
          ...selectedMoveDetailResponse.data,
          type: moveTypeDetailResponse.data
        },
        expForNextLvl: growthRate(teamLevel + 1) - growthRate(teamLevel)
      })
    }
  }, [
    teamState,
    teamLevel,
    teamDetailResponse,
    selectedMoveDetailResponse,
    moveTypeDetailResponse,
    speciesDetailResponse
  ])

  return <TeamContext.Provider value={teamData}>{children}</TeamContext.Provider>
}
