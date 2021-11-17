import { passwordString } from './passwordString'

describe('passwordString', () => {
  it('can decode', () => {
    expect(() => passwordString.parse('')).toThrow('form.validation.password')
    expect(passwordString.parse('12345')).toBe('12345')
  })
})
