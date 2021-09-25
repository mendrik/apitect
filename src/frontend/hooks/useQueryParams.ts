import { fromPairs } from 'ramda'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQueryParams = (): Record<string, string> => {
  const location = useLocation()
  return useMemo(() => {
    try {
      const searchParams = new URLSearchParams(location.search)
      return fromPairs(Array.from(searchParams.entries()))
    } catch (e) {
      console.warn(e)
      return {}
    }
  }, [location.search])
}
