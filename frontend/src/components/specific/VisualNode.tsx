import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { useStore, useStoreMap } from 'effector-react'
import { pathEq } from 'ramda'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React from 'react'
import styled from 'styled-components'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { iconMap, NodeType } from '~shared/types/domain/nodeType'
import { Jsx } from '~shared/types/generic'

import { openNodeState, selectNode } from '../../events/tree'
import { $openNodes } from '../../stores/$openNodesStore'
import { $selectedNode } from '../../stores/$selectedNode'
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

export const VisualNode = ({ depth = 0, node }: Jsx<OwnProps>) => {
  const id = node.value.id
  const isActive = useStoreMap($selectedNode, pathEq(['value', 'id'], id))
  const openNodes = useStore($openNodes)
  const hasChildren = isNotNilOrEmpty(node.children)
  const open = openNodes[id]
  const nodeType = node.value.nodeType

  return (
    <>
      {depth > 0 && (
        <NodeGrid
          tabIndex={0}
          onFocus={() => selectNode(node)}
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
          {mapIndexed((node, idx) => (
            <li key={idx}>
              <VisualNode node={node} depth={depth + 1} />
            </li>
          ))}
        </NotEmptyList>
      )}
    </>
  )
}
