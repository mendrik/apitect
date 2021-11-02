import * as t from 'io-ts'

import { withDefault } from '../../codecs/withDefault'

export type UiNode = {
  name: string
  children: UiNode[]
}

export const TUiNode: t.Type<UiNode> = t.recursion('node', () =>
  t.exact(
    t.type({
      name: t.string,
      children: withDefault(t.array(TUiNode), [])
    })
  )
)
