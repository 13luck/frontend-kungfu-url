import { parsePagination } from './parsePagination'


test.each([
  [new URLSearchParams(''), { pageSize: 10, pageIndex: 1 }],
  [new URLSearchParams('pageSize=&pageIndex='), { pageSize: 10, pageIndex: 1 }],
  [new URLSearchParams('pageSize=&pageIndex=2'), { pageSize: 10, pageIndex: 2 }],
  [new URLSearchParams('pageSize=20&pageIndex=2'), { pageSize: 20, pageIndex: 2 }],

])('parsePagination case #%', (params, result) => {
  expect(parsePagination(params)).toEqual(result)
})
