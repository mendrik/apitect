import * as t from 'io-ts'

export type UiNode = {
  name: string
  children: UiNode[]
}

export const TUiNode: t.Type<UiNode> = t.recursion('node', () =>
  t.type({
    name: t.string,
    children: t.array(TUiNode)
  })
)
