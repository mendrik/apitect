import 'io-ts/Codec'

import { decode } from './decode'
import { emailCodec } from './emailCodec'

describe('emailCodec', () => {
  it('can decode', () => {
    expect(() => decode(emailCodec)('')).toThrow('form.validation.required')
    expect(() => decode(emailCodec)('andreas@mindmine')).toThrow('form.validation.validEmail')
    expect(decode(emailCodec)('andreas@mindmine.fi')).toBe('andreas@mindmine.fi')
  })
})
