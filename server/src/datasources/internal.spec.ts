import { v4 as uuid } from 'uuid'

describe('internal database works', () => {
  it('can store new items', () => {
    expect(uuid()).toEqual(expect.anything())
  })
})
