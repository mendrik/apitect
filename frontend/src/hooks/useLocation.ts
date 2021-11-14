import { Location as LocationUntyped, useLocation as useLocationUntyped } from 'react-router-dom'

import { Maybe } from '../shared/types/generic'

interface Location<T> extends LocationUntyped {
  state: T
}

export const useLocation = <T>(): Location<T> => useLocationUntyped()
