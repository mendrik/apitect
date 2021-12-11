import { ZodError } from 'zod'
import { dateCodec } from '~shared/codecs/dateCodec'

describe('dateCodec', () => {
  it('can decode', () => {
    expect(dateCodec.parse('2021-12-11T21:56:47.460Z')).toBeInstanceOf(Date)
    expect(dateCodec.parse(new Date())).toBeInstanceOf(Date)
    expect(() => dateCodec.parse(new Date(NaN))).toThrow(ZodError)
    expect(() => dateCodec.parse('andreas')).toThrow(ZodError)
  })
})
