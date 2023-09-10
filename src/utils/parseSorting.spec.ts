import { defaultSorting, parseSorting } from './parseSorting'


test.each([
  [new URLSearchParams(''), defaultSorting],
  [new URLSearchParams('direction=ascend'), defaultSorting],
  [new URLSearchParams('sortBy=_&direction=ascend'), defaultSorting],
  [new URLSearchParams('sortBy=name&direction=_'), defaultSorting],
  [new URLSearchParams('sortBy=name&direction=descend'), { sortBy: 'name', direction: 'descend' }],

])('parseSorting case #%', (params, result) => {
  expect(parseSorting(params)).toEqual(result)
})
