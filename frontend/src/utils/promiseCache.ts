import S from 'sherlockjs'
import { Fn } from '~shared/types/generic'

type TimeStamp = number
type Duration = number
type CachedItem<T> = [TimeStamp, T]

export class PromiseCache<T> {
  private data = new WeakMap<Fn<Promise<T>>, CachedItem<T>>()

  private readonly ttl: Duration

  constructor(ttl: string) {
    const res = S.parse(ttl)
    if (res.startDate == null) {
      throw Error('Failed to parse ttl')
    }
    this.ttl = res.startDate.getTime() - Date.now()
  }

  public get(key: Fn<Promise<T>>, generator: () => Promise<T>): Promise<T> {
    const item = this.data.get(key)
    if (item == null || Date.now() - item[0] > this.ttl) {
      return generator().then(res => {
        this.data.set(key, [Date.now(), res])
        return res
      })
    }
    return Promise.resolve(item[1])
  }

  public flush() {
    this.data = new WeakMap<Fn<Promise<T>>, CachedItem<T>>()
  }
}
