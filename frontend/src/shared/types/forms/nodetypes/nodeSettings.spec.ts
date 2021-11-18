import { generateDefaults } from '../../../../utils/zod'
import { ZNumberSettings } from './numberSettings'

describe('nodeSettings', () => {
  it('can extract defaults', () => {
    const defVal = generateDefaults(ZNumberSettings)
    expect(defVal).toHaveProperty('integer', true)
  })
})
