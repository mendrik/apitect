import { regexpCodecAlt } from './regexpCodecAlt'

describe('regexpCodec', () => {
  it('can decode', () => {
    expect(() => regexpCodecAlt.parse('')).toThrow('form.validation.required')
    expect(() => regexpCodecAlt.parse('(')).toThrow('form.validation.validRegExp')
    expect(regexpCodecAlt.parse('^\\d')).toBe('^\\d')
  })
})
