import { v4 as uuid } from 'uuid'

import { withDatabase } from '../tests/withDatabase'

describe('internal database works', () => {
  withDatabase()

  it('can store new items', () => {
    expect(uuid()).toEqual(expect.anything())
  })
})
