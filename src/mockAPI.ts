import Loki from 'lokijs'
import { uniq } from 'rambda'

import { pokemons } from './pokemons'


export type Pokemon = {
  id: string
  name: string
  type: string[]
  image: string
  description: string
}

const loki = new Loki('pokemons')
const pokemonCollection = loki.addCollection('pokemons')
pokemons.forEach((pokemon) => pokemonCollection.insert(pokemon as unknown as Pokemon))

export const pokemonTypes = uniq(pokemons.flatMap(({ types }) => types))

export const mockAPI = (query: {
  text?: string
  types?: string[]
  limit: number
  offset: number
  sortBy: string
  direction: 'ascend' | 'descend'
}) => {
  const { text, offset, types, limit, sortBy, direction } = query

  const result = pokemonCollection.chain()
    .find({
      ...(text ? { name: { $regex: [text, 'i'] } } : {}),
      ...(types?.length ? { types: { $containsAny: types } } : {}),
    })
    .simplesort(sortBy, { desc: direction === 'descend' })

  return {
    result: result.offset(offset).limit(limit).data(),
    total: result.count(),
  }
}
