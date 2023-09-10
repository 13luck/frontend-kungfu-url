import { Maybe } from 'purify-ts'


const sortFields = ['name']
const sortDirections = ['ascend', 'descend']

const head = <T>([x]: T[]) => x as T
const includes = <T>(xs: T[]) => (x: T) => xs.includes(x)

const parseValue = (value: string | null, values: string[]) => Maybe
  .fromNullable(value)
  .filter(includes(values))
  .orDefault(head(values))

export const parseSorting = (params: URLSearchParams) => {
  const sortBy = parseValue(params.get('sortBy'), sortFields)
  const direction = parseValue(params.get('direction'), sortDirections) as 'ascend' | 'descend'

  return { sortBy, direction }
}

export const defaultSorting = parseSorting(new URLSearchParams())
