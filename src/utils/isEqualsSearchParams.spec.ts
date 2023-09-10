import { isEqualsSearchParams } from './isEqualsSearchParams'


test.each([
  [
    true,
    new URLSearchParams('x=1'),
    new URLSearchParams('x=1'),
  ], [
    false,
    new URLSearchParams('x=2'),
    new URLSearchParams('x=1'),
  ], [
    true,
    new URLSearchParams('x=1&y=2'),
    new URLSearchParams('y=2&x=1'),
  ], [
    true,
    new URLSearchParams('x=1&x=2&y=1&y=2'),
    new URLSearchParams('y=1&y=2&x=1&x=2'),
  ],
] as Array<[
  boolean,
  URLSearchParams,
  URLSearchParams,
]>)('isEqualsSearchParams case #%', (result, a, b) => {
  expect(isEqualsSearchParams(a, b)).toBe(result)
})
