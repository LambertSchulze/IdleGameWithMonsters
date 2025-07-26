import { useState, useEffect } from 'react'
import { type MonName, useLocationQuery } from '../../store/pokemonApi'

export const useEncounter = () => {
  const [encounter, setEncounter] = useState<MonName | null>(null)
  const { data, isSuccess } = useLocationQuery('kanto-route-1-area')

  useEffect(() => {
    if (isSuccess) {
      const names = data.encounters.flatMap(e => e.name)
      const chances = data.encounters.flatMap(e => e.chance)
      const chanceLadder = chances.map((_, i, arr) => arr[i] + (arr[i - 1] ?? 0))
      const random = Math.floor(Math.random() * 100) + 1
      const randomNameIndex = chanceLadder.findIndex(chance => chance > random)

      setEncounter(names[randomNameIndex])
    }
  }, [isSuccess, data])

  return encounter
}
