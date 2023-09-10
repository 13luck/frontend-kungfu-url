import { parseQuery } from './parseQuery'


test('parseQuery', () => {
  const params = new URLSearchParams('text=a&types=rock&types=fire')

  expect(parseQuery(params)).toEqual({ text: 'a', types: ['rock', 'fire'] })
})
