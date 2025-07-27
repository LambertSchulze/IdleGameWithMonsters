import { useState, useEffect } from 'react'
import { type MonName, useLocationQuery } from '../../store/pokemonApi'
import { getWeightedRandom } from '../../helpers/getWeightedRandom'

// prettier-ignore
const getLocationAreaName = (stageId: number) => {
  if      (stageId <= 10) return 'kanto-route-1-area'
  else if (stageId <= 20) return 'kanto-route-2-south-towards-viridian-city'
  else if (stageId <= 30) return 'viridian-forest-area'
  else if (stageId <= 40) return 'kanto-route-3-area'

  return 'kanto-route-22-area'
}

export const useEncounter = (id: number) => {
  const [encounter, setEncounter] = useState<MonName | null>(null)
  const { data, isSuccess } = useLocationQuery(getLocationAreaName(id))

  useEffect(() => {
    if (isSuccess) {
      const names = data.encounters.map(e => e.name)
      const chances = data.encounters.map(e => e.chance)
      const randomName = getWeightedRandom(names, chances)

      setEncounter(randomName)
    }
  }, [isSuccess, data, id])

  return encounter
}
