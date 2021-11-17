import { ZApiRequest } from './apiRequest'
import { NodeType } from './domain/nodeType'
import { ZNodeSettingsBase } from './forms/nodetypes/nodeSettingsBase'
import { ZNumberSettings } from './forms/nodetypes/numberSettings'
import { ZStringSettings } from './forms/nodetypes/stringSettings'

describe('ApiRequest', () => {
  it('can parse string settings', () => {
    const test = {
      nodeType: 'STRING',
      nodeId: '4cfb3ae1-633d-4f7a-b9b7-febd5db947a8',
      name: 'City',
      validation: {
        regexp: '/\\d*/i'
      }
    }
    expect(ZNodeSettingsBase.parse(test)).toHaveProperty('nodeType', NodeType.String)
    expect(ZStringSettings.parse(test)).toHaveProperty('validation.regexp', '/\\d*/i')
    const actual = ZApiRequest.parse({ id: 'ddd', method: 'updateNodeSettings', payload: test })
    expect(actual).toHaveProperty('payload.validation.regexp', '/\\d*/i')
  })

  it('can parse number settings', () => {
    const test = {
      nodeType: 'STRING',
      nodeId: '4cfb3ae1-633d-4f7a-b9b7-febd5db947a8',
      name: 'City',
      float: false,
      validation: {
        min: 1
      },
      display: {
        suffix: '€'
      }
    }
    expect(ZNodeSettingsBase.parse(test)).toHaveProperty('nodeType', NodeType.String)
    expect(ZNumberSettings.parse(test)).toHaveProperty('validation.min', 1)
    const actual = ZApiRequest.parse({ id: 'ddd', method: 'updateNodeSettings', payload: test })
    expect(actual).toHaveProperty('payload.validation.min', 1)
  })
})
