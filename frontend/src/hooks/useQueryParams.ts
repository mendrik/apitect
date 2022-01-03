import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQueryParams = (): Record<string, string> => {
  const location = useLocation()
  return useMemo(() => Object.fromEntries(new URLSearchParams(location.search)), [location.search])
}
