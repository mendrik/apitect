import { ZApiRequest } from './apiRequest'
import { NodeType } from './domain/nodeType'
import { ZNumberSettings } from './forms/nodetypes/numberSettings'
import { StringValidationType, ZStringSettings } from './forms/nodetypes/stringSettings'

describe('ApiRequest', () => {
  it('can parse string settings', () => {
    const test = {
      nodeType: NodeType.String,
      nodeId: '4cfb3ae1-633d-4f7a-b9b7-febd5db947a8',
      name: 'City',
      validationType: StringValidationType.Regexp,
      regexp: '/\\d*/i'
    }
    const stringSettings = ZStringSettings.parse(test)
    const apiRequest = ZApiRequest.parse({ id: 'ddd', method: 'updateNodeSettings', payload: test })
    expect(stringSettings).toHaveProperty('nodeType', NodeType.String)
    expect(stringSettings).toHaveProperty('regexp', '/\\d*/i')
    expect(apiRequest).toHaveProperty('payload.regexp', '/\\d*/i')
  })

  it('can parse number settings', () => {
    const test = {
      nodeType: NodeType.Number,
      nodeId: '4cfb3ae1-633d-4f7a-b9b7-febd5db947a8',
      name: 'City',
      integer: true,
      required: false,
      validation: {
        min: 1
      },
      display: {
        unit: '€'
      }
    }
    const numberSettings = ZNumberSettings.parse(test)
    expect(numberSettings).toHaveProperty('nodeType', NodeType.Number)
    expect(numberSettings).toHaveProperty('validation.min', 1)
    const apiRequest = ZApiRequest.parse({ id: 'ddd', method: 'updateNodeSettings', payload: test })
    expect(apiRequest).toHaveProperty('payload.validation.min', 1)
  })
})
