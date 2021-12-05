import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQueryParams = (): Record<string, string> => {
  const location = useLocation()
  return useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return Object.fromEntries(searchParams)
  }, [location.search])
}
