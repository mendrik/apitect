import { flip, mapObjIndexed } from 'ramda'

export const addParams = (
  params: Record<string, string>,
  current: string = document.location.href
): string => {
  const url = new URL(current)
  const sp = url.searchParams
  mapObjIndexed(flip(sp.set.bind(sp)), params)
  return url.href
}
