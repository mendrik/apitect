import { blank } from '~shared/utils/strings'

describe('strings', () => {
  it('blank', () => {
    expect(blank`${null}!`).toBe(null)
    expect(blank`${'Hi'}!`).toBe('Hi!')
    expect(blank`Hi ${null}!`).toBe(null)
    expect(blank`Hi ${''}!`).toBe(null)
    expect(blank`Hi ${'Andreas'}!`).toBe('Hi Andreas!')
    expect(blank`Hi ${''} and ${null}!`).toBe(null)
    expect(blank`Hi ${'Andreas'} and ${'Peter'}!`).toBe('Hi Andreas and Peter!')
  })
})
