export type GrowthRateName =
  | 'slow'
  | 'medium'
  | 'fast'
  | 'medium-slow'
  | 'slow-then-very-fast'
  | 'fast-then-very-slow'

export const getGrowthRate = (growthRate: GrowthRateName) => {
  const getExpFormula = (growthRate: GrowthRateName) => {
    switch (growthRate) {
      case 'slow':
        return (x: number) => ((5 * x) ^ 3) / 4
      case 'medium':
        return (x: number) => x ^ 3
      case 'fast':
        return (x: number) => ((4 * x) ^ 3) / 5
      case 'medium-slow':
        return (x: number) => ((6 * x) ^ 3) / 5 - ((15 * x) ^ 2) + 100 * x - 140
      case 'slow-then-very-fast':
        return (x: number) => {
          if (x < 50) return ((x ^ 3) * (100 - x)) / 50
          if (50 <= x && x < 68) return ((x ^ 3) * (150 - x)) / 100
          if (68 <= x && x < 98) return ((x ^ 3) * Math.floor((1911 - 10 * x) / 3)) / 500
          if (98 <= x) return ((x ^ 3) * (160 - x)) / 100
        }
      case 'fast-then-very-slow':
        return (x: number) => {
          if (x < 15) return ((x ^ 3) * (Math.floor((x + 1) / 3) + 24)) / 50
          if (15 <= x && x < 36) return x ^ ((3 * (x + 14)) / 50)
          if (36 <= x) return ((x ^ 3) * (Math.floor(x / 2) + 32)) / 50
        }
      default:
        return (x: number) => x
    }
  }

  return getExpFormula(growthRate)
}
