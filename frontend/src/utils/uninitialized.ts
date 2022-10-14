export const uninitialized = <T extends object>() =>
  new Proxy<T>({} as T, {
    get(_target, prop): any {
      throw Error(`Object was not yet initialized ${String(prop)}`)
    }
  })
