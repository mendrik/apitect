import { useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { cond, eqBy, F, juxt, path, pathEq, prop, T, unless } from 'ramda'
import { isFalse, isNotNil, isTrue, mapIndexed } from 'ramda-adjunct'
import styled from 'styled-components'
import { useStoreMap } from '~hooks/useStoreMap'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { Jsx } from '~shared/types/generic'
import { matches } from '~shared/utils/ramda'
import { withoutBlanks as λ } from '~shared/utils/strings'
import { getArrayNode } from '~stores/$arrayStores'
import { $openNodes } from '~stores/$openNodesStore'
import { $selectedNode } from '~stores/$selectedNode'

import { canHaveChildrenNodes } from '../../../constants'
import { selectNode } from '../../../events/tree'
import { selectValue } from '../../../events/values'
import { Draggables } from '../../../utils/draggables'
import { NotEmptyList } from '../../generic/NotEmptyList'
import { DropMarker } from './DropMarker'
import { NodeFlavorIcon } from './NodeFlavorIcon'
import { NodeIcon } from './NodeIcon'
import { NodeName } from './NodeName'

type OwnProps = {
  node: TreeNode<Node>
  depth?: number
  isDragGhost?: boolean
}

const Ol = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`

const NodeGrid = styled.div`
  display: grid;
  grid-template-columns: 20px auto 20px;
  align-items: center;
  user-select: none;
  & > :first-child {
    justify-self: center;
  }
  & > :nth-child(2) {
    cursor: pointer;
  }
`

const RootWrap = ({ children }: Jsx) => <Ol>{children}</Ol>
const ListWrap = ({ children }: Jsx) => <Ol className="ps-3">{children}</Ol>
export const sameType = eqBy(path(['data', 'current', 'type']))

export const VisualNode = ({ depth = 0, node, isDragGhost = false }: OwnProps) => {
  const { id } = node.value
  const isActive = useStoreMap($selectedNode, pathEq(['value', 'id'], id))
  const open = useStoreMap($openNodes, prop(id))
  const arrayNode = getArrayNode(node)
  const arrayNodeId = λ`_${arrayNode?.value.id}`

  const {
    active,
    attributes,
    listeners,
    transform,
    setNodeRef: dragRef,
    setActivatorNodeRef: activatorRef
  } = useDraggable({
    id,
    data: { type: Draggables.TREE_NODE + arrayNodeId }
  })

  const {
    setNodeRef: dropRef,
    isOver,
    over
  } = useDroppable({
    id,
    data: {
      type: Draggables.TREE_NODE + arrayNodeId,
      isLastArrayNode: node.isLast && isNotNil(arrayNode)
    }
  })

  const isRoot = depth === 0
  const selfHover = active?.id === id

  const parentOk = (node: TreeNode<Node>) =>
    canHaveChildrenNodes.includes(node.parent!.value.nodeType)

  const sameArrayNode = () => active != null && over != null && sameType(over, active)
  const lastArrayNode = () => over != null && path(['data', 'current', 'isLastArrayNode'], over)

  const canDrop =
    sameArrayNode() &&
    cond<[boolean, TreeNode<Node>], boolean>([
      [matches(isFalse, T), F],
      [matches(isTrue, parentOk), T],
      [matches(isTrue), F],
      [T, F]
    ])(isOver, node)

  const style = {
    transform: CSS.Transform.toString(transform)
  }

  const dndKit = isDragGhost ? {} : { id, ...attributes, ...listeners }

  const onFocus = () => {
    selectValue(null)
    selectNode(node)
  }

  return selfHover ? (
    <div style={style} />
  ) : (
    <div style={style}>
      {(!isRoot || isDragGhost) && (
        <NodeGrid
          onFocus={onFocus}
          className={clsx('gap-1', { selectedNode: isActive })}
          ref={unless(() => isDragGhost, juxt([dragRef, dropRef]))}
          {...dndKit}
        >
          <NodeIcon node={node} isDragGhost={isDragGhost} />
          <NodeName node={node} activatorRef={activatorRef} isActive={isActive} />
          <NodeFlavorIcon node={node} isDragGhost={isDragGhost} />
        </NodeGrid>
      )}
      {canDrop && <DropMarker node={node} depth={depth} />}
      {open && (
        <NotEmptyList list={node.children} as={isRoot && !isDragGhost ? RootWrap : ListWrap}>
          {mapIndexed(node => (
            <li key={node.value.id}>
              <VisualNode node={node} depth={depth + 1} isDragGhost={isDragGhost} />
            </li>
          ))}
        </NotEmptyList>
      )}
    </div>
  )
}
