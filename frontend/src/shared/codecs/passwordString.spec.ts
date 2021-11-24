import { passwordString } from './passwordString'

describe('passwordString', () => {
  it('can decode', () => {
    expect(() => passwordString.parse('nouppercase')).toThrow('form.validation.password')
    expect(() => passwordString.parse('2shrt')).toThrow('form.validation.password')
    expect(() => passwordString.parse('0282382')).toThrow('form.validation.password')
    expect(passwordString.parse('Abc345')).toBe('Abc345')
  })
})
