import { arrayPushPull } from './arrayPushPull'


test('arrayPushPull', () => {
  expect(arrayPushPull([1, 2], 3, true)).toEqual([1, 2, 3])
  expect(arrayPushPull([1, 2, 3], 2, false)).toEqual([1, 3])
})
