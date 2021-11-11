import { sign } from 'jsonwebtoken'

import { verifyP } from './endpoint'

describe('authorization', () => {
  it('token works', () => {
    const token = sign({ email: 'bla@blub.com' }, 'testKey', { expiresIn: '1d' })
    expect(() => verifyP(token, 'testKey2')).rejects.toStrictEqual(expect.anything())
    expect(verifyP(token, 'testKey')).resolves.toStrictEqual(
      expect.objectContaining({ email: 'bla@blub.com' })
    )
  })
})
