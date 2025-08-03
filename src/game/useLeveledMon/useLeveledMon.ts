import { skipToken } from '@reduxjs/toolkit/query'
import type { MonName, Stats } from '../../store/pokemonApi'
import { useMonDetailQuery, useSpeciesDetailQuery } from '../../store/pokemonApi'
import { getGrowthRate } from '../GrowthRate/getGrowthRate'
import { getStats } from '../Stats/getStats'

export interface LeveledMon {
  stats: Stats
  expForNextLvl: number
}

export const useLeveledMonQuery = (name: MonName, level: number): LeveledMon | undefined => {
  const monDetail = useMonDetailQuery(name ? name : skipToken)
  const speciesDetail = useSpeciesDetailQuery(
    monDetail.isSuccess ? monDetail.data.species : skipToken
  )
  const growthRate = speciesDetail.isSuccess
    ? getGrowthRate(speciesDetail.data.growthRate)
    : undefined

  if (monDetail.isSuccess && speciesDetail.isSuccess && growthRate) {
    return {
      stats: getStats(monDetail.data.baseStats, level),
      expForNextLvl: growthRate(level + 1) - growthRate(level)
    }
  }
}
