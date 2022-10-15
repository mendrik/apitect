import { useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { useStoreMap } from 'effector-react'
import { juxt, pathEq, prop } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import styled from 'styled-components'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { Jsx } from '~shared/types/generic'
import { getArrayNode } from '~stores/$arrayStores'
import { $openNodes } from '~stores/$openNodesStore'
import { $selectedNode } from '~stores/$selectedNode'

import { selectNode } from '../../../events/tree'
import { selectValue } from '../../../events/values'
import { Draggables } from '../../../utils/draggables'
import { NotEmptyList } from '../../generic/NotEmptyList'
import { NodeChildCount } from './NodeChildCount'
import { NodeFlavorIcon } from './NodeFlavorIcon'
import { NodeIcon } from './NodeIcon'
import { NodeName } from './NodeName'
import { useIsDragged } from './useIsDragged'

type OwnProps = {
  node: TreeNode<Node>
  depth?: number
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

export const VisualNode = ({ depth = 0, node }: OwnProps) => {
  const { id } = node.value
  const isActive = useStoreMap($selectedNode, pathEq(['value', 'id'], id))
  const open = useStoreMap($openNodes, prop(id))
  const arrayNode = getArrayNode(node)

  const {
    active,
    attributes,
    listeners,
    transform,
    setNodeRef: dragRef,
    setActivatorNodeRef: activatorRef
  } = useDraggable({ id, data: { node, type: Draggables.TREE_NODE, arrayNode } })

  const disabled = false // over?.id !== id

  const { setNodeRef: dropRef } = useDroppable({
    id,
    data: { type: Draggables.TREE_NODE, arrayNode, node }
  })

  const beingDragged = useIsDragged(node)
  const isRoot = depth === 0

  if (active?.id === id) {
    // don't render current dragged node
    return null
  }

  const renderSelf = !isRoot || beingDragged

  const style = {
    transform: CSS.Transform.toString(transform)
  }

  const dndKit = beingDragged
    ? { id }
    : { ref: juxt([dragRef, dropRef]), id, ...attributes, ...listeners }

  const onFocus = () => {
    selectValue(null)
    selectNode(node)
  }

  return (
    <div style={style}>
      {renderSelf && (
        <NodeGrid
          onFocus={onFocus}
          className={clsx('gap-1', {
            selectedNode: isActive,
            'opacity-25': disabled
          })}
          {...dndKit}
        >
          <NodeIcon node={node} />
          <NodeName node={node} activatorRef={activatorRef} isActive={isActive}>
            <NodeChildCount node={node} />
          </NodeName>
          <NodeFlavorIcon node={node} />
        </NodeGrid>
      )}
      {(isRoot || open) && !beingDragged ? (
        <NotEmptyList list={node.children} as={isRoot && !beingDragged ? RootWrap : ListWrap}>
          {mapIndexed(node => (
            <li key={node.value.id}>
              <VisualNode node={node} depth={depth + 1} />
            </li>
          ))}
        </NotEmptyList>
      ) : null}
    </div>
  )
}
