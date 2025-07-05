import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface PokemonDetailApi {
  name: string
  sprites: {
    front_default: string
    back_default: string
  }
  stats: {
    0: {
      base_stat: number
      stat: {
        name: 'hp'
      }
    }
    1: {
      base_stat: number
      stat: {
        name: 'attack'
      }
    }
    2: {
      base_stat: number
      stat: {
        name: 'defense'
      }
    }
    3: {
      base_stat: number
      stat: {
        name: 'special-attack'
      }
    }
    4: {
      base_stat: number
      stat: {
        name: 'special-defense'
      }
    }
    5: {
      base_stat: number
      stat: {
        name: 'speed'
      }
    }
  }
}

export interface MonDetailData {
  name: string
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
  spriteFront: string
  spriteBack: string
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/'
  }),
  endpoints: build => ({
    monDetail: build.query<MonDetailData, string>({
      query: slug => `pokemon/${slug}/`,
      transformResponse: (result: PokemonDetailApi) => ({
        name: result.name,
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        specialAttack: result.stats[3].base_stat,
        specialDefense: result.stats[4].base_stat,
        speed: result.stats[5].base_stat,
        spriteFront: result.sprites.front_default,
        spriteBack: result.sprites.back_default
      })
    })
  })
})

export const { useMonDetailQuery } = pokemonApi
