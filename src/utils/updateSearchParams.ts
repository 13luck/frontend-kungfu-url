type Value =
  | undefined
  | null
  | boolean
  | string
  | string[]
  | number
  | number[]

const castValueToArray = <T>(v: T) => (v === undefined ? [] : [v])
const toStringArray = <T>(v: T) => (Array.isArray(v) ? v : castValueToArray(v)).map(String)

export const updateSearchParams = (prev: URLSearchParams) => (
  entries: Record<string, Value>,
) => {
  const next = new URLSearchParams(prev)
  const addValueBy = (key: string) => (value: string) => next.append(key, value.toString())

  Object
    .entries(entries)
    .forEach(([key, values]) => {
      next.delete(key)
      toStringArray(values)
        .filter(Boolean)
        .forEach(addValueBy(key))
    })

  return next
}
