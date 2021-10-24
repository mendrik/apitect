import * as t from 'io-ts'
import S from 'sherlockjs'

export interface Sherlock extends t.Type<Date, string, unknown> {}

export const sherlockDate: Sherlock = new t.Type<Date, string, unknown>(
  'Sherlock',
  (u): u is Date => u instanceof Date,
  (u, c) => {
    const res = S.parse(`${u}`)
    return res.validated && res.startDate != null ? t.success(res.startDate) : t.failure(u, c)
  },
  a => a.toISOString()
)
