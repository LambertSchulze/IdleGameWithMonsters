import { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useAppSelector } from '../../store/store'
import {
  useMonDetailQuery,
  useMoveDetailQuery,
  useTypeDetailQuery,
  type MonDetailData,
  type MoveDetailData,
  type TypeDetailData
} from '../../store/pokemonApi'

export interface AttackerMon extends Omit<MonDetailData, 'types'> {
  types: {
    1: TypeDetailData
    2: TypeDetailData | null
  }
  attack: MoveDetailData
}

export const useTeam = () => {
  const teamState = useAppSelector(state => state.teamState)
  const [team, setTeam] = useState<AttackerMon | null>()

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

  useEffect(() => {
    if (
      teamDetailResponse.isSuccess &&
      selectedMoveDetailResponse.isSuccess &&
      firstTypeDetailResponse.isSuccess &&
      secondTypeDetailResponse.isSuccess
    ) {
      setTeam({
        ...teamDetailResponse.data,
        types: {
          1: firstTypeDetailResponse.data,
          2: secondTypeDetailResponse.data
        },
        attack: selectedMoveDetailResponse.data
      })
    }
  }, [
    teamDetailResponse,
    firstTypeDetailResponse,
    secondTypeDetailResponse,
    selectedMoveDetailResponse
  ])

  return {
    team
  }
}
