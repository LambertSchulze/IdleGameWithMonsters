export type GrowthRateName =
  | 'slow'
  | 'medium'
  | 'fast'
  | 'medium-slow'
  | 'slow-then-very-fast'
  | 'fast-then-very-slow'

// prettier-ignore
export const getGrowthRate = (growthRate: GrowthRateName) => {
  const getExpFormula = (growthRate: GrowthRateName) => {
    let calc

    switch (growthRate) {
      case 'slow':
        calc = (x: number) => (5 * (x ^ 3)) / 4
        break
      case 'medium':
        calc = (x: number) => x ^ 3
        break
      case 'fast':
        calc = (x: number) => (4 * (x ^ 3)) / 5
        break
      case 'medium-slow':
        calc = (x: number) => (6 / 5 * (x ^ 3)) - (15 * (x ^ 2)) + (100 * x) - 140
        break
      case 'slow-then-very-fast':
        calc = (x: number) => {
          if (x < 50)            return ((x ^ 3) * (100 - x)) / 50
          if (50 <= x && x < 68) return ((x ^ 3) * (150 - x)) / 100
          if (68 <= x && x < 98) return ((x ^ 3) * Math.floor((1911 - 10 * x) / 3)) / 500
          else                   return ((x ^ 3) * (160 - x)) / 100
        }
        break
      case 'fast-then-very-slow':
        calc = (x: number) => {
          if (x < 15)            return ((x ^ 3) * (Math.floor((x + 1) / 3) + 24)) / 50
          if (15 <= x && x < 36) return x ^ ((3 * (x + 14)) / 50)
          else                   return ((x ^ 3) * (Math.floor(x / 2) + 32)) / 50
        }
        break
    }

    return (x: number) => Math.max(Math.floor(calc(x)), 0)
  }

  return getExpFormula(growthRate)
}
