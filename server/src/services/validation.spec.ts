import { number, object, string, ZodError } from 'zod'

describe('validation', () => {
  it('zod can construct validator', () => {
    const zod = object({}).setKey('a', number()).setKey('b', string())
    const invalid = { a: 1, b: 1 }
    expect(() => zod.parse(invalid)).toThrow(ZodError)
    const valid = { a: 1, b: '1' }
    expect(zod.parse(valid)).toStrictEqual(valid)
  })
})
