import { combine, createEffect, createEvent, createStore, sample } from 'effector'

import { mockAPI, Pokemon } from './mockAPI'
import { getPaginationArgs } from './utils/getPaginationArgs'
import { parsePagination } from './utils/parsePagination'
import { parseQuery } from './utils/parseQuery'
import { parseSorting } from './utils/parseSorting'
import { prettyQuery } from './utils/prettyQuery'


export const $dataSource = createStore<Pokemon[]>([])
export const $total = createStore(0)
export const fetchList = createEvent()
export const fxRequestAPI = createEffect(mockAPI)
export const sync = createEvent<URLSearchParams>()

export const $searchParams = createStore(new URLSearchParams())
export const $pagination = $searchParams.map(parsePagination)
export const $sorting = $searchParams.map(parseSorting)
export const $query = $searchParams.map(parseQuery)

export const $appliedFilters = $query.map((query) => ({
  text: query.text ? 1 : 0,
  types: query.types?.length ?? 0,
}))

sample({
  clock: sync,
  target: $searchParams,
})

sample({
  clock: fxRequestAPI.doneData,
  target: $dataSource,
  fn: ({ result }) => result,
})

sample({
  clock: fxRequestAPI.doneData,
  target: $total,
  fn: ({ total }) => total,
})

sample({
  clock: fetchList,
  target: fxRequestAPI,
  source: combine([$query, $pagination, $sorting]),
  fn: ([query, pagination, sorting]) => ({
    ...prettyQuery(query),
    ...getPaginationArgs(pagination),
    ...sorting,
  }),
})
