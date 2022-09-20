import { docId, email, Nodes, tag } from '../tests/fixtureContants'
import { addValue, deleteValues } from '../tests/utils'
import { withDatabase } from '../tests/withDatabase'
import { arrayItemCreate } from './arrayItemCreate'
import { valueList } from './valueList'

const params = { docId, email }

describe('arrayItemCreate', () => {
  withDatabase()

  beforeEach(() => deleteValues(Nodes.fullName, Nodes.birthday))

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
      payload: { tag, nodeIds: [Nodes.fullName, Nodes.birthday] }
    })
    expect(values).toHaveLength(0) // dangling values have been cleared
  })

  it('fails on validation when values are missing', async () => {
    await addValue(Nodes.fullName, 'Andreas')
    await arrayItemCreate({
      ...params,
      payload: {
        arrayNodeId: Nodes.people,
        tag
      }
    })
  })
})
