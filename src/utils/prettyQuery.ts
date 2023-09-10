export const prettyQuery = (query: object) => (
  Object.fromEntries(
    Object
      .entries(query)
      .filter(([, v]) => !!v?.length || v === null || v === false || v === true),
  )
)
