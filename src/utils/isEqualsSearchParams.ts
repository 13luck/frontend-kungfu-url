import { equals } from 'rambda'


export const isEqualsSearchParams = (
  a: URLSearchParams,
  b: URLSearchParams,
) => equals(
  Object.fromEntries(a.entries()),
  Object.fromEntries(b.entries()),
)
