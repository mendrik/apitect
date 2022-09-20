import { v4 as uuid } from 'uuid'

import { docId, email, Nodes, tag } from '../tests/fixtureContants'
import { addValue } from '../tests/utils'
import { withDatabase } from '../tests/withDatabase'
import { arrayItemCreate } from './arrayItemCreate'

const params = { docId, email }

describe('arrayItemCreate', () => {
  withDatabase()

  it('arrayItemCreate', async () => {
    await addValue(Nodes.fullName, 'Andreas')
    await addValue(Nodes.birthday, '1976-11-13T22:00:00.000Z')
    await arrayItemCreate({
      ...params,
      payload: {
        arrayNodeId: '',
        tag
      }
    })
    expect(uuid()).toEqual(expect.anything())
  })
})
