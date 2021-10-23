export const renameProp =
  <T, K extends keyof T>(oldProp: K, newProp: string): Omit<T, K> & Record<typeof newProp, T[K]> =>
  ({ [oldProp]: old, ...rest }) => ({
    [newProp]: old,
    ...rest
  })
