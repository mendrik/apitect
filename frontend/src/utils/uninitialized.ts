export const uninitialized = <T extends object>() =>
  new Proxy<T>({} as T, {
    get(): any {
      throw Error('Object was not yet initialized')
    }
  })
