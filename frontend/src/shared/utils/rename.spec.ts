import { convertUnderscoreIds } from './rename'

describe('rename', () => {
  it('_id converter works', () => {
    const obj = { _id: 1, name: 'andreas' }
    const renamed = convertUnderscoreIds(obj)
    expect(renamed).toHaveProperty('id', 1)
    expect(renamed).not.toHaveProperty('_id')
    expect(renamed).toHaveProperty('name', 'andreas')
  })

  it('_id converter works deeply', () => {
    const obj = { _id: 1, name: 'andreas', document: { _id: 3, name: 'Peter' } }
    const renamed = convertUnderscoreIds(obj)
    expect(renamed).toHaveProperty('id', 1)
    expect(renamed.id).toEqual(1)
    expect(renamed).not.toHaveProperty('_id')
    expect(renamed).toHaveProperty('name', 'andreas')
    expect(renamed.document.id).toEqual(3)
    expect(renamed.document).not.toHaveProperty('_id')
  })

  it('_id converter ignores Date/ObjectId', () => {
    class ObjectId {
      constructor(public x: number) {}
    }

    const obj = { _id: new ObjectId(1), date: new Date() }
    const renamed = convertUnderscoreIds(obj)
    expect(renamed.date).toBeInstanceOf(Date)
  })
})
