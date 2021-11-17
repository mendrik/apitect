import { ZNumberSettings } from './numberSettings'

describe('nodeSettings', () => {
  it('can extract defaults', () => {
    const defVal = ZNumberSettings.deepPartial().parse({})
    console.log(defVal.integer)
    expect(defVal).toHaveProperty('integer', true)
  })
})
