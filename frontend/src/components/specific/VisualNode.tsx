import { useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { cond, includes, juxt, pathEq, prop, range, T, unless } from 'ramda'
import { isFalse, isNotNilOrEmpty, isTrue, mapIndexed } from 'ramda-adjunct'
import styled from 'styled-components'
import { useStoreMap } from '~hooks/useStoreMap'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { iconMap, NodeType } from '~shared/types/domain/nodeType'
import { Jsx } from '~shared/types/generic'
import { matches } from '~shared/utils/ramda'
import { $openNodes } from '~stores/$openNodesStore'
import { $selectedNode } from '~stores/$selectedNode'

import { openNodeState, selectNode } from '../../events/tree'
import { selectValue } from '../../events/values'
import { Draggables } from '../../utils/draggables'
import { Icon } from '../generic/Icon'
import { NotEmptyList } from '../generic/NotEmptyList'
import { DropMarker } from './DropMarker'

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

export const VisualNode = ({ depth = 0, node, isDragGhost = false }: OwnProps) => {
  const { id, name, nodeType } = node.value
  const isActive = useStoreMap($selectedNode, pathEq(['value', 'id'], id))
  const open = useStoreMap($openNodes, prop(id))

  const {
    active,
    attributes,
    listeners,
    transform,
    setNodeRef: dragRef,
    setActivatorNodeRef: activateRef
  } = useDraggable({
    id,
    data: [Draggables.TREE_NODE]
  })

  const { setNodeRef: dropRef, isOver } = useDroppable({
    id,
    data: [Draggables.TREE_NODE]
  })

  const hasChildren = isNotNilOrEmpty(node.children)
  const isRoot = depth === 0
  const isDraggedDescendent =
    includes(
      active?.id,
      node.pathToRoot().map(n => n.id)
    ) ?? false

  // prettier-ignore
  const possibleDropLevels = cond<[boolean, boolean, boolean], number[]>([
    [matches(isFalse, T, T), () => []],
    [matches(T, isTrue, T), () => []],
    [matches(T, T, isFalse), () => range(0, depth + 1)],
    [matches(T, T, isTrue), () => [depth + 1]],
    [T, () => []]
  ])(isOver, isDraggedDescendent, hasChildren)

  const style = {
    transform: CSS.Transform.toString(transform)
  }

  const dndKit = isDragGhost
    ? {}
    : {
        id: node.value.id,
        ...attributes,
        ...listeners
      }

  const onFocus = () => {
    selectValue(null)
    selectNode(node)
  }

  return (
    <>
      {(!isRoot || isDragGhost) && (
        <NodeGrid
          onFocus={onFocus}
          className={clsx('gap-1', { selectedNode: isActive })}
          ref={unless(() => isDragGhost, juxt([dragRef, dropRef]))}
          {...dndKit}
        >
          {hasChildren ? (
            <Icon
              icon={IconChevronRight}
              onClick={() => !isDragGhost && openNodeState([node, !open])}
              iconClasses={clsx('rotate', { deg90: open })}
              size={14}
            />
          ) : nodeType !== NodeType.Object && nodeType !== NodeType.Array ? (
            <Icon icon={iconMap[nodeType]} size={14} disabled />
          ) : (
            <div />
          )}
          <div
            className={clsx('text-truncate', { thin: !hasChildren })}
            title={name}
            onMouseDown={() => {
              if (document.activeElement?.id === id) {
                selectNode(isActive ? null : node)
              }
            }}
            ref={activateRef}
          >
            {name}
          </div>
          {!isDragGhost && nodeType === NodeType.Array && (
            <Icon icon={iconMap[nodeType]} size={14} disabled tabIndex={0} />
          )}
        </NodeGrid>
      )}
      <DropMarker possibleDropLevels={possibleDropLevels} />
      {open && (
        <NotEmptyList list={node.children} as={isRoot && !isDragGhost ? RootWrap : ListWrap}>
          {mapIndexed(node => (
            <li key={id}>
              <VisualNode node={node} depth={depth + 1} isDragGhost={isDragGhost} />
            </li>
          ))}
        </NotEmptyList>
      )}
    </>
  )
}
