import { prettyQuery } from './prettyQuery'


test('prettyQuery', () => {
  expect(prettyQuery({
    // todo
    text: '',
    city: '',
    sourceSystem: [],
    stars: [0],
    tags: ['tag'],
    hotelIds: [],
    panelStatus: [],
    isCustomMarkup: null,
    truthy: true,
    falsy: false,
  })).toEqual({
    stars: [0],
    tags: ['tag'],
    isCustomMarkup: null,
    truthy: true,
    falsy: false,
  })
})
