export const parseQuery = (params: URLSearchParams) => {
  const text = params.get('text') ?? ''
  const types = params.getAll('types') ?? []

  return { text, types }
}
