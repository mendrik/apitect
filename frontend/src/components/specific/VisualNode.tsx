import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { useStoreMap } from 'effector-react'
import { pathEq, prop } from 'ramda'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import styled from 'styled-components'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { iconMap, NodeType } from '~shared/types/domain/nodeType'
import { Jsx } from '~shared/types/generic'
import { $openNodes } from '~stores/$openNodesStore'
import { $selectedNode } from '~stores/$selectedNode'

import { openNodeState, selectNode } from '../../events/tree'
import { selectValue } from '../../events/values'
import { Icon } from '../generic/Icon'
import { NotEmptyList } from '../generic/NotEmptyList'

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
  const id = node.value.id
  const nodeType = node.value.nodeType

  const isActive = useStoreMap($selectedNode, pathEq(['value', 'id'], id))
  const open = useStoreMap($openNodes, prop(id))
  const hasChildren = isNotNilOrEmpty(node.children)

  const onFocus = () => {
    selectValue(null)
    selectNode(node)
  }

  return (
    <>
      {depth > 0 && (
        <NodeGrid
          tabIndex={0}
          onFocus={onFocus}
          id={id}
          className={clsx('gap-1', { selectedNode: isActive })}
        >
          {hasChildren ? (
            <Icon
              icon={IconChevronRight}
              onClick={() => openNodeState([node, !open])}
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
            title={node.value.name}
            onMouseDown={() => {
              if (document.activeElement?.id === node.value.id) {
                selectNode(isActive ? null : node)
              }
            }}
          >
            {node.value.name}
          </div>
          {nodeType === NodeType.Array && (
            <Icon icon={iconMap[nodeType]} size={14} disabled tabIndex={0} />
          )}
        </NodeGrid>
      )}
      {open && (
        <NotEmptyList list={node.children} as={depth === 0 ? RootWrap : ListWrap}>
          {mapIndexed(node => (
            <li key={node.value.id}>
              <VisualNode node={node} depth={depth + 1} />
            </li>
          ))}
        </NotEmptyList>
      )}
    </>
  )
}
