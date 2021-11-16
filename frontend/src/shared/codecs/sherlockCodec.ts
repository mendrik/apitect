import S from 'sherlockjs'
import { string } from 'zod'

export const sherlockDate = string().transform(u => {
  const res = S.parse(u)
  if (res.validated && res.startDate != null) {
    res.startDate
  } else {
    throw Error('form.validation.sherlock')
  }
})
