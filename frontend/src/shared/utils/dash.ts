type Rec<T extends object, K extends keyof T> = T[K]

export const _ = new Proxy<
  Record<string, <T extends object, K extends keyof T>(o: T) => Rec<T, K>>
>(
  {},
  {
    get(target: any, p: string) {
      return <T extends object, K extends typeof p & keyof T>(obj: T) => obj[p as K] as Rec<T, K>
    }
  }
)
