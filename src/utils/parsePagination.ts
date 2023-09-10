import { Maybe } from 'purify-ts'
import { complement } from 'rambda'


const getValue = (initial: string | null) => Maybe
  .fromNullable(initial)
  .map(parseInt)
  .filter(complement(Number.isNaN))

export const parsePagination = (params: URLSearchParams) => ({
  pageSize: getValue(params.get('pageSize')).orDefault(10),
  pageIndex: getValue(params.get('pageIndex')).orDefault(1),
})
