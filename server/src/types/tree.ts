import * as t from 'io-ts'

export type Node = {
  name: string
  children: Node[]
}

export const TNode: t.Type<Node> = t.recursion('node', () =>
  t.type({
    name: t.string,
    children: t.array(TNode)
  })
)
