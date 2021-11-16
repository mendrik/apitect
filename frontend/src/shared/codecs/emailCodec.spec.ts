import { emailCodec } from './emailCodec'

describe('emailCodec', () => {
  it('can decode', () => {
    expect(() => emailCodec.parse('')).toThrow('form.validation.required')
    expect(() => emailCodec.parse('andreas@mindmine')).toThrow('form.validation.validEmail')
    expect(emailCodec.parse('andreas@mindmine.fi')).toBe('andreas@mindmine.fi')
  })
})
