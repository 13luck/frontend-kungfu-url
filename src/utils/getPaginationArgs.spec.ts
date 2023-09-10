import { getPaginationArgs } from './getPaginationArgs'


test('getPaginationArgs', () => {
  expect(getPaginationArgs({ pageSize: 10, pageIndex: 1 })).toEqual({ limit: 10, offset: 0 })
  expect(getPaginationArgs({ pageSize: 10, pageIndex: 2 })).toEqual({ limit: 10, offset: 10 })
  expect(getPaginationArgs({ pageSize: 20, pageIndex: 3 })).toEqual({ limit: 20, offset: 40 })
})
