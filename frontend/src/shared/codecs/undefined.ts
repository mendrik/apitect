import * as t from 'io-ts'

import { withDefault } from './withDefault'

export const undefinedCodec = <T>(type: t.Type<T>): t.Type<T | undefined> =>
  t.union([type, t.undefined])
