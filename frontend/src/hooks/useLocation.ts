import { Location as LocationUntyped, useLocation as useLocationUntyped } from 'react-router-dom'

interface Location<T> extends LocationUntyped {
  state: T
}

export const useLocation = <T>(): Location<T> => useLocationUntyped()
