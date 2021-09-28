import { sign } from 'jsonwebtoken'

import { verifyP } from './endpoint'

describe('authorization', () => {
  it('token works', () => {
    const token = sign({ id: 1 }, 'testKey', { expiresIn: '1d' })
    expect(() => verifyP(token, 'testKey2')).rejects.toStrictEqual(expect.anything())
    expect(verifyP(token, 'testKey')).resolves.toStrictEqual(expect.objectContaining({ id: 1 }))
  })
})
