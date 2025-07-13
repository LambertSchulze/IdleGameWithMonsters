import { useState } from 'react'
import { useAppSelector } from '../../store/store'
import type { MonName } from '../../store/pokemonApi'

function getRandomItemFrom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export const useEncounter = () => {
  const encounters = useAppSelector(state => state.gameState.encounters)
  const [encounter, setEncounter] = useState<MonName>(getRandomItemFrom(encounters))

  const getNewEncounter = () => {
    setEncounter(getRandomItemFrom(encounters))
  }

  return [encounter, getNewEncounter] as const
}
