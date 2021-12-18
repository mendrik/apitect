import { flip, map, mapObjIndexed } from 'ramda'

export const addParams = (
  params: Record<string, string>,
  current: Location = document.location
): string => {
  const url = new URL(current.href)
  const sp = url.searchParams
  mapObjIndexed(flip(sp.set.bind(sp)), params)
  return url.href.substring(current.origin.length)
}

export const removeParams = (params: string[], current: Location = document.location): string => {
  const url = new URL(current.href)
  const sp = url.searchParams
  map(sp.delete.bind(sp), params)
  return url.href.substring(current.origin.length)
}
