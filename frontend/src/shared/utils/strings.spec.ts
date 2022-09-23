import { withoutBlanks as _ } from '~shared/utils/strings'

describe('strings', () => {
  it('blank', () => {
    expect(_`${null}!`).toBe(null)
    expect(_`${'Hi'}!`).toBe('Hi!')
    expect(_`Hi ${null}!`).toBe(null)
    expect(_`Hi ${''}!`).toBe(null)
    expect(_`Hi ${'Andreas'}!`).toBe('Hi Andreas!')
    expect(_`Hi ${''} and ${null}!`).toBe(null)
    expect(_`Hi ${'Andreas'} and ${'Peter'}!`).toBe('Hi Andreas and Peter!')
  })
})
