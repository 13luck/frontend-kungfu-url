export const getPaginationArgs = ({ pageSize, pageIndex }: { pageSize: number; pageIndex: number }) => ({
  limit: pageSize,
  offset: (pageIndex - 1) * pageSize,
})
