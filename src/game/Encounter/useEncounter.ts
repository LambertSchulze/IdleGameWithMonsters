import { useAppSelector } from '../../store/store'

function getRandomItemFrom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export const useEncounter = () => {
  const encounters = useAppSelector(state => state.gameState.encounters)

  return getRandomItemFrom(encounters)
}
