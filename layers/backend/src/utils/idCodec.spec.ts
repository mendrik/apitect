import { ObjectId } from 'bson'

describe('idCodec', () => {
  it('validates', () => {
    const docId = new ObjectId()
    expect(ObjectId.isValid(docId)).toBe(true)
  })
})
