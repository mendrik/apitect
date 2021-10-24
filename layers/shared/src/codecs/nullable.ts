import * as t from 'io-ts'

import { withDefault } from './withDefault'

export const nullable = <T>(type: t.Type<T>): t.Type<T | null> =>
  withDefault(t.union([type, t.null]), null)
