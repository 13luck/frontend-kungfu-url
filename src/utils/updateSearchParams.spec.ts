import { updateSearchParams } from './updateSearchParams'


describe('updateSearchParams', () => {
  test('updates', () => {
    const a = new URLSearchParams('x=1')
    const b = updateSearchParams(a)({ x: 2, y: ['3'] }) // adding
    const c = updateSearchParams(a)({ x: [''], y: undefined }) // deleting

    expect(a.get('x')).toEqual('1')
    expect(a.get('y')).toEqual(null)

    expect(b.get('y')).toEqual('3')
    expect(b.get('x')).toEqual('2')

    expect(c.get('x')).toEqual(null)
    expect(c.get('y')).toEqual(null)
  })

  test('string casting', () => {
    const a = new URLSearchParams('')
    const b = updateSearchParams(a)({ key1: false, key2: null })

    expect(b.get('key1')).toEqual('false')
    expect(b.get('key2')).toEqual('null')
  })
})
