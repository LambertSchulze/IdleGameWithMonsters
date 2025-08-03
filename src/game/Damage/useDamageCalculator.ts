import type { Enemy } from '../Enemy/EnemyContext'
import type { TypeDetailData, TypeName, Stats, MonTypes } from '../../store/pokemonApi'

// Simplified crit chanche: D50 roll
const critical = Math.floor(Math.random() * 50) + 1 === 50 ? 2 : 1

const sameTypeAttackBonus = (attackType: TypeName, attackerTypes: MonTypes) => {
  if (attackType === attackerTypes[1] || attackType === attackerTypes[2]) return 1.5
  else return 1
}

const typeEffectiveness = (attackType: TypeDetailData, defenderType: TypeName | null) => {
  if (!defenderType) return 1
  if (attackType.damageRelations.doubleDamageTo.includes(defenderType)) return 2
  if (attackType.damageRelations.halfDamageTo.includes(defenderType)) return 0.5
  if (attackType.damageRelations.noDamageTo.includes(defenderType)) return 0
  else return 1
}

export function useDamageCalculator() {
  const random = Math.floor(Math.random() * (255 - 217 + 1) + 217) / 255

  const damageCalculator = (
    attackerLvl: number,
    attackerStats: Stats,
    attackerTypes: MonTypes,
    attackPower: number,
    attackType: TypeDetailData,
    defender: Enemy
  ) =>
    Math.round(
      ((((2 * attackerLvl * critical) / 5 + 2) * attackPower * attackerStats.attack) /
        defender.stats.defense /
        50 +
        2) *
        sameTypeAttackBonus(attackType.name, attackerTypes) *
        typeEffectiveness(attackType, defender.types[1]) *
        typeEffectiveness(attackType, defender.types[2]) *
        random
    )

  return {
    damageCalculator
  }
}
