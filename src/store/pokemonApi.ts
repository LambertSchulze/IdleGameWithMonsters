import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GrowthRateName } from '../game/GrowthRate/getGrowthRate'

export type MonName = string & { type: 'MonName' }

export type MoveName = string & { type: 'MoveName' }

export type StatName = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed'

export type TypeName =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'

export type DamageClassName = 'physical' | 'special'

interface PokemonDetailApi {
  name: MonName
  sprites: {
    front_default: string
    back_default: string
  }
  base_experience: number
  stats: {
    base_stat: number
    stat: {
      name: StatName
    }
  }[]
  moves: {
    move: {
      name: MoveName
    }
    version_group_details: {
      level_learned_at: number
      move_learn_method: {
        name: string
      }
      version_group: {
        name: string
      }
    }[]
  }[]
  types: {
    slot: number
    type: {
      name: TypeName
    }
  }[]
  species: {
    name: MonName
  }
}

export interface Stats {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export interface MonDetailData {
  name: MonName
  baseExp: number
  baseStats: Stats
  types: {
    1: TypeName
    2: TypeName | null
  }
  moves: {
    name: MoveName
    learnedAt: number
  }[]
  sprites: {
    front: string
    back: string
  }
  species: MonName
}

interface TypeDetailApi {
  name: TypeName
  damage_relations: {
    double_damage_to: { name: TypeName }[]
    half_damage_to: { name: TypeName }[]
    no_damage_to: { name: TypeName }[]
  }
}

export interface TypeDetailData {
  name: TypeName
  damageRelations: {
    doubleDamageTo: TypeName[]
    halfDamageTo: TypeName[]
    noDamageTo: TypeName[]
  }
}

interface MoveDetailApi {
  name: MoveName
  power: number
  type: {
    name: TypeName
  }
  damage_class: {
    name: DamageClassName
  }
}

export interface MoveDetailData {
  name: MoveName
  power: number
  type: TypeName
  damageClass: DamageClassName
}

interface SpeciesApi {
  growth_rate: {
    name: GrowthRateName
  }
}

export interface SpeciesData {
  growthRate: GrowthRateName
}

interface PokedexApi {
  id: number
  pokemon_entries: {
    entry_number: number
    pokemon_species: {
      name: MonName
    }
  }[]
}

export interface PokedexEntry {
  id: number
  name: MonName
}

export interface PokedexData {
  [key: MonName]: PokedexEntry
}

interface LocationAreaApi {
  name: string
  pokemon_encounters: {
    pokemon: {
      name: MonName
    }
    version_details: {
      max_chance: number
      version: {
        name: string
      }
    }[]
  }[]
}

export interface LocationData {
  name: string
  encounters: {
    name: MonName
    chance: number
  }[]
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/'
  }),
  endpoints: build => ({
    monDetail: build.query<MonDetailData, MonName>({
      query: slug => `pokemon/${slug}/`,
      transformResponse: (result: PokemonDetailApi) => ({
        name: result.name,
        baseExp: result.base_experience,
        baseStats: {
          hp: result.stats.find(s => s.stat.name === 'hp')!.base_stat,
          attack: result.stats.find(s => s.stat.name === 'attack')!.base_stat,
          defense: result.stats.find(s => s.stat.name === 'defense')!.base_stat,
          specialAttack: result.stats.find(s => s.stat.name === 'special-attack')!.base_stat,
          specialDefense: result.stats.find(s => s.stat.name === 'special-defense')!.base_stat,
          speed: result.stats.find(s => s.stat.name === 'speed')!.base_stat
        },
        types: {
          1: result.types.find(t => t.slot === 1)!.type.name,
          2: result.types.find(t => t.slot === 2)?.type.name ?? null
        },
        moves: result.moves
          .filter(move =>
            move.version_group_details.find(
              version =>
                version.move_learn_method.name === 'level-up' &&
                version.version_group.name === 'red-blue'
            )
          )
          .map(move => ({
            name: move.move.name,
            learnedAt: move.version_group_details.find(
              version => version.version_group.name === 'red-blue'
            )!.level_learned_at
          })),
        sprites: {
          front: result.sprites.front_default,
          back: result.sprites.back_default
        },
        species: result.species.name
      })
    }),
    typeDetail: build.query<TypeDetailData, TypeName>({
      query: type => `type/${type}/`,
      transformResponse: (result: TypeDetailApi) => ({
        name: result.name,
        damageRelations: {
          doubleDamageTo: result.damage_relations.double_damage_to.map(type => type.name),
          halfDamageTo: result.damage_relations.half_damage_to.map(type => type.name),
          noDamageTo: result.damage_relations.no_damage_to.map(type => type.name)
        }
      })
    }),
    moveDetail: build.query<MoveDetailData, MoveName>({
      query: move => `move/${move}/`,
      transformResponse: (result: MoveDetailApi) => ({
        name: result.name,
        power: result.power,
        type: result.type.name,
        damageClass: result.damage_class.name
      })
    }),
    speciesDetail: build.query<SpeciesData, MonName>({
      query: id => `pokemon-species/${id}`,
      transformResponse: (result: SpeciesApi) => ({
        growthRate: result.growth_rate.name as GrowthRateName
      })
    }),
    pokedex: build.query<PokedexData, number>({
      query: id => `pokedex/${id}`,
      transformResponse: (result: PokedexApi) => {
        const pokedex: PokedexData = {}

        result.pokemon_entries.forEach(entry => {
          pokedex[entry.pokemon_species.name] = {
            name: entry.pokemon_species.name,
            id: entry.entry_number
          }
        })

        return pokedex
      }
    }),
    location: build.query<LocationData, string>({
      query: id => `location-area/${id}`,
      transformResponse: (result: LocationAreaApi) => ({
        name: result.name,
        encounters: result.pokemon_encounters
          .filter(encounter =>
            encounter.version_details.find(version => version.version.name === 'red')
          )
          .map(encounter => ({
            name: encounter.pokemon.name,
            chance: encounter.version_details.find(version => version.version.name === 'red')!
              .max_chance
          }))
      })
    })
  })
})

export const {
  useMonDetailQuery,
  useTypeDetailQuery,
  useMoveDetailQuery,
  useSpeciesDetailQuery,
  usePokedexQuery,
  useLocationQuery
} = pokemonApi
