import type { Stats } from '../../store/pokemonApi'

export const getLeveledStats = (baseStats: Stats, level: number): Stats => {
  const statCalculation = (baseStat: number) => Math.floor((baseStat * 2 * level) / 100) + 5
  const hpCalculation = (baseHp: number) => Math.floor((baseHp * 2 * level) / 100) + level + 10

  return {
    hp: hpCalculation(baseStats.hp),
    attack: statCalculation(baseStats.attack),
    defense: statCalculation(baseStats.defense),
    specialAttack: statCalculation(baseStats.specialAttack),
    specialDefense: statCalculation(baseStats.specialAttack),
    speed: statCalculation(baseStats.speed)
  }
}
