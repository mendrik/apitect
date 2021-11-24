import { useStore } from 'effector-react'
import { cond, pathEq, pipe, propEq } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import React, { useMemo } from 'react'

import {
  closeNode,
  deleteNodeFx,
  newNodeFx,
  nodeSettingsFx,
  openNode,
  selectNode
} from '../../events/tree'
import { useDefinedEffect } from '../../hooks/useDefinedEffect'
import { Strategy, TreeNode } from '../../shared/algebraic/treeNode'
import { Node } from '../../shared/types/domain/node'
import { Jsx, Maybe } from '../../shared/types/generic'
import { next, prev } from '../../shared/utils/ramda'
import $appStore from '../../stores/$appStore'
import { preventDefault as pd } from '../../utils/preventDefault'
import { VisualNodeTemplate } from './VisualNodeTemplate'

const visibleNodes = (root: Node, openNodes: Record<string, boolean>) =>
  TreeNode.from<Node, 'children'>('children')(root)
    .flatten(Strategy.Depth)
    .filter(n =>
      n
        .pathToRoot()
        .map(p => openNodes[p.id])
        .every(isTrue)
    )

export const VisualTree = ({ children }: Jsx) => {
  const { tree, openNodes, selectedNode } = useStore($appStore)
  const visualNodes = useMemo(() => visibleNodes(tree, openNodes), [tree, openNodes])

  useDefinedEffect(node => {
    document.getElementById(node.value.id)?.focus({ preventScroll: true })
  }, selectedNode)

  const nextNode = (): Maybe<TreeNode<Node>> =>
    next(pathEq(['value', 'id'], selectedNode?.value.id))(visualNodes.slice(1))
  const prevNode = (): Maybe<TreeNode<Node>> =>
    prev(pathEq(['value', 'id'], selectedNode?.value.id))(visualNodes.slice(1))

  const keyMap = cond([
    [propEq('key', 'ArrowDown'), pd(pipe(nextNode, selectNode))],
    [propEq('key', 'ArrowUp'), pd(pipe(prevNode, selectNode))],
    [propEq('key', 'ArrowRight'), pd(() => openNode(selectedNode))],
    [propEq('key', 'ArrowLeft'), pd(() => closeNode(selectedNode))],
    [propEq('key', 'Delete'), pd(() => selectedNode && deleteNodeFx(selectedNode.value.id))],
    [propEq('key', 'n'), pd(() => newNodeFx(selectedNode?.value))],
    [propEq('key', 'Enter'), pd(() => selectedNode && nodeSettingsFx(selectedNode.value.id))]
  ])

  return (
    <div onKeyDown={keyMap}>
      <VisualNodeTemplate node={visualNodes[0]}>{children}</VisualNodeTemplate>
    </div>
  )
}
