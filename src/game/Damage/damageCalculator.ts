import type { MonDetailData, MoveDetailData } from '../../store/pokemonApi'

export function useDamageCalculator() {
  // TODO: Calculate Type Effectiveness
  // https://bulbapedia.bulbagarden.net/wiki/Type/Type_chart
  const type1Effectiveness: number = 1
  const type2Effectiveness: number = 1
  const attackerLevel = 1
  const random = Math.floor(Math.random() * (255 - 217 + 1) + 217) / 255

  const damageCalculator = (
    attacker: MonDetailData,
    defender: MonDetailData,
    attack: MoveDetailData
  ) =>
    Math.round(
      ((((2 * attackerLevel) / 5 + 2) * attack.power * attacker.stats.attack) /
        defender.stats.defense /
        50 +
        2) *
        type1Effectiveness *
        type2Effectiveness *
        random
    )

  return {
    damageCalculator
  }
}
