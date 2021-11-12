import 'io-ts/Codec'

import { decode } from './decode'
import { regexpCodecAlt } from './regexpCodecAlt'

describe('regexpCodec', () => {
  it('can decode', () => {
    expect(() => decode(regexpCodecAlt)('')).toThrow('form.validation.required')
    expect(() => decode(regexpCodecAlt)('(')).toThrow('form.validation.validRegExp')
    expect(decode(regexpCodecAlt)('^\\d')).toBe('^\\d')
  })
})
