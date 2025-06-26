import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface PokemonDetailApi {
  id: number
  name: string
  sprites: {
    front_default: string
  }
}

interface PokemonDetailData {
  id: number
  name: string
  sprite: string
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/'
  }),
  endpoints: build => ({
    pokemonDetail: build.query<PokemonDetailData, number>({
      query: id => `pokemon/${id}/`,
      transformResponse: (result: PokemonDetailApi) => ({
        id: result.id,
        name: result.name,
        sprite: result.sprites.front_default
      })
    })
  })
})

export const { usePokemonDetailQuery } = pokemonApi
