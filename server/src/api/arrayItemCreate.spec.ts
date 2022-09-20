import { v4 as uuid } from 'uuid'

import { docId, email, Nodes, tag } from '../tests/fixtureContants'
import { addValue } from '../tests/utils'
import { withDatabase } from '../tests/withDatabase'
import { arrayItemCreate } from './arrayItemCreate'
import { valueList } from './valueList'

const params = { docId, email }

describe('arrayItemCreate', () => {
  withDatabase()

  it('can create item', async () => {
    await addValue(Nodes.fullName, 'Andreas')
    await addValue(Nodes.birthday, '1976-11-13T22:00:00.000Z')
    const uuid = await arrayItemCreate({
      ...params,
      payload: {
        arrayNodeId: Nodes.people,
        tag
      }
    })
    expect(uuid).toBeDefined()
    const { values } = await valueList({
      ...params,
      payload: { tag, nodeIds: [Nodes.fullName, Nodes.birthday], arrayItemId: uuid }
    })
    expect(values).toHaveLength(0) // dangling values have been cleared
  })

  it('Fails on invalid items', async () => {
    await addValue(Nodes.fullName, 'Andreas')
    await addValue(Nodes.birthday, '1976-11-13T22:00:00.000Z')
    await arrayItemCreate({
      ...params,
      payload: {
        arrayNodeId: Nodes.people,
        tag
      }
    })
    expect(uuid()).toEqual(expect.anything())
  })
})
