import { withoutBlanks as λ } from '~shared/utils/strings'

describe('strings', () => {
  it('blank', () => {
    expect(λ`${null}!`).toBe(null)
    expect(λ`${'Hi'}!`).toBe('Hi!')
    expect(λ`Hi ${null}!`).toBe(null)
    expect(λ`Hi ${''}!`).toBe(null)
    expect(λ`Hi ${'Andreas'}!`).toBe('Hi Andreas!')
    expect(λ`Hi ${''} and ${null}!`).toBe(null)
    expect(λ`Hi ${'Ok'} and ${false}!`).toBe(null)
    expect(λ`Hi ${'Andreas'} and ${'Peter'}!`).toBe('Hi Andreas and Peter!')
  })
})
