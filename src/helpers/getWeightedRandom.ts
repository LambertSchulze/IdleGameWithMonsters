export const getWeightedRandom = <T>(values: T[], chances: number[]): T => {
  if (chances.length === 0 || values.length === 0)
    throw Error("Can't pick random element from empty array")

  const chanceLadder = chances.map((_, i, arr) => arr[i] + (arr[i - 1] ?? 0))
  const random = Math.floor(Math.random() * chanceLadder.at(-1)!) + 1
  const randomIndex = chanceLadder.findIndex(chance => chance > random)

  return values[randomIndex]
}
