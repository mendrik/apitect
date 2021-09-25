import { flip, mapObjIndexed } from 'ramda'

export const addParams = (
  params: Record<string, string>,
  current: Location = document.location
): string => {
  const url = new URL(current.href)
  const sp = url.searchParams
  mapObjIndexed(flip(sp.set.bind(sp)), params)
  return url.href.substr(current.origin.length)
}
