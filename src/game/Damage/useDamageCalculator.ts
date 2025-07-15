import type { Team } from '../Team/TeamContext'
import type { Enemy } from '../Enemy/EnemyContext'
import type { TypeDetailData, TypeName } from '../../store/pokemonApi'

// Simplified crit chanche: D50 roll
const critical = Math.floor(Math.random() * 50) + 1 === 50 ? 2 : 1

const sameTypeAttackBonus = (attacker: Team) => {
  if (
    attacker.attack.type.name === attacker.types[1] ||
    attacker.attack.type.name === attacker.types[2]
  )
    return 1.5
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
  const attackerLevel = 1
  const random = Math.floor(Math.random() * (255 - 217 + 1) + 217) / 255

  const damageCalculator = (attacker: Team, defender: Enemy) =>
    Math.round(
      ((((2 * attackerLevel * critical) / 5 + 2) * attacker.attack.power * attacker.stats.attack) /
        defender.stats.defense /
        50 +
        2) *
        sameTypeAttackBonus(attacker) *
        typeEffectiveness(attacker.attack.type, defender.types[1]) *
        typeEffectiveness(attacker.attack.type, defender.types[2]) *
        random
    )

  return {
    damageCalculator
  }
}
