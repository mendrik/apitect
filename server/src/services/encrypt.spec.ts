import { scryptSync } from 'crypto'

import { salt } from '../constants'
import { decrypt, encrypt } from './encrypt'

describe('encrypt', () => {
  it('works both ways', () => {
    const test = 'Andreas'
    const key = scryptSync('password', salt, 32)
    expect(decrypt(encrypt(test, key), key)).toBe(test)
  })
})
