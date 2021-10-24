import { ObjectId } from 'mongodb'

describe('idCodec', () => {
  it('validates', () => {
    const docId = new ObjectId()
    expect(ObjectId.isValid(docId)).toBe(true)
  })
})
