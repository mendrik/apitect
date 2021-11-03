import { id } from './rename'

describe('rename', () => {
  it('_id converter works', () => {
    const obj = { _id: 1, name: 'andreas' }
    const renamed = id(obj)
    expect(renamed).toHaveProperty('id', 1)
    expect(renamed).not.toHaveProperty('_id')
    expect(renamed).toHaveProperty('name', 'andreas')
  })

  it('_id converter works deepy', () => {
    const obj = { _id: 1, name: 'andreas', document: { _id: 3, name: 'Peter' } }
    const renamed = id(obj)
    expect(renamed).toHaveProperty('id', 1)
    expect(renamed.id).toEqual(1)
    expect(renamed).not.toHaveProperty('_id')
    expect(renamed).toHaveProperty('name', 'andreas')
    expect(renamed.document.id).toEqual(3)
    expect(renamed.document).not.toHaveProperty('_id')
  })
})
