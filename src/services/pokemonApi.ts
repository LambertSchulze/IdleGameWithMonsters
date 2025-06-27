import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface PokemonDetailApi {
  id: number
  name: string
  attack: number
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
  }
  sprites: {
    front_default: string
    back_default: string
  }
}

interface MonDetailData {
  id: number
  name: string
  hp: number
  attack: number
  spriteFront: string
  spriteBack: string
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/'
  }),
  endpoints: build => ({
    monDetail: build.query<MonDetailData, number>({
      query: id => `pokemon/${id}/`,
      transformResponse: (result: PokemonDetailApi) => ({
        id: result.id,
        name: result.name,
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        spriteFront: result.sprites.front_default,
        spriteBack: result.sprites.back_default
      })
    })
  })
})

export const { useMonDetailQuery } = pokemonApi
