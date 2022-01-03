import { Fn, Milliseconds } from '~shared/types/generic'

type TimeStamp = number
type CachedItem<T> = [TimeStamp, T]

export class PromiseCache<T> {
  private data = new WeakMap<Fn<Promise<T>>, CachedItem<T>>()

  constructor(private ttl: Milliseconds) {}

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
