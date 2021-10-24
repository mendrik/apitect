import 'io-ts/Codec'

import { decode } from './decode'
import { passwordString } from './passwordString'

describe('passwordString', () => {
  it('can decode', () => {
    expect(() => decode(passwordString)('')).toThrow('form.validation.password')
    expect(decode(passwordString)('12345')).toBe('12345')
  })
})
