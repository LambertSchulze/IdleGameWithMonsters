import { type FC, type PropsWithChildren } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { TeamContext } from './TeamContext'
import { useAppSelector } from '../../store/store'
import { useMonDetailQuery } from '../../store/pokemonApi'
import { useMoveDetailQuery } from '../../store/pokemonApi'
import { useTypeDetailQuery } from '../../store/pokemonApi'

export const TeamProvider: FC<PropsWithChildren> = ({ children }) => {
  const teamState = useAppSelector(state => state.teamState)
  const teamDetailResponse = useMonDetailQuery(teamState[0].name)
  const selectedMoveDetailResponse = useMoveDetailQuery(teamState[0].attack)
  const firstTypeDetailResponse = useTypeDetailQuery(
    teamDetailResponse.isSuccess ? teamDetailResponse.data.types[1] : skipToken
  )
  const secondTypeDetailResponse = useTypeDetailQuery(
    teamDetailResponse.isSuccess && teamDetailResponse.data.types[2]
      ? teamDetailResponse.data.types[2]
      : skipToken
  )
  let team = null

  if (
    teamDetailResponse.isSuccess &&
    selectedMoveDetailResponse.isSuccess &&
    firstTypeDetailResponse.isSuccess &&
    (teamDetailResponse.data.types[2] ? secondTypeDetailResponse.isSuccess : true)
  ) {
    team = {
      ...teamDetailResponse.data,
      types: {
        1: firstTypeDetailResponse.data,
        2: secondTypeDetailResponse.data ?? null
      },
      attack: selectedMoveDetailResponse.data
    }
  }

  return <TeamContext.Provider value={team}>{children}</TeamContext.Provider>
}
