import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React from 'react'
import styled from 'styled-components'

import { closeNode, openNode, selectNode } from '../../events/tree'
import { iconMap, NodeType } from '../../shared/types/domain/nodeType'
import { Node } from '../../shared/types/domain/tree'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'
import { Icon } from '../generic/Icon'
import { NotEmptyList } from '../generic/NotEmptyList'

type OwnProps = {
  node: Node
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

export const VisualNodeTemplate = ({ depth = 0, node, children: footer }: Jsx<OwnProps>) => {
  const { openNodes } = useStore($appStore)
  const hasChildren = isNotNilOrEmpty(node.children)
  const { selectedNode } = useStore($appStore)
  const open = openNodes[node.id]

  return (
    <>
      {depth > 0 && (
        <NodeGrid
          tabIndex={0}
          id={node.id}
          key={node.id}
          className={clsx('gap-1', { selectedNode: selectedNode?.id === node.id })}
          onClick={() => selectNode(selectedNode?.id === node.id ? undefined : node)}
        >
          {hasChildren ? (
            <Icon
              icon={IconChevronRight}
              onClick={() => (openNodes[node.id] ? closeNode(node) : openNode(node))}
              iconClasses={clsx('rotate', { deg90: open })}
              size={14}
            />
          ) : node.nodeType !== NodeType.Object ? (
            <Icon icon={iconMap[node.nodeType]} size={14} disabled />
          ) : (
            <div />
          )}
          <div className={clsx('text-truncate', { thin: !hasChildren })} title={node.name}>
            {node.name}
          </div>
          {node.nodeType === NodeType.Array && (
            <Icon icon={iconMap[node.nodeType]} size={14} disabled />
          )}
        </NodeGrid>
      )}
      {(open || depth === 0) && (
        <NotEmptyList list={node.children} as={depth === 0 ? RootWrap : ListWrap}>
          {mapIndexed((node, idx) => (
            <li key={idx}>
              <VisualNodeTemplate node={node} depth={depth + 1} />
            </li>
          ))}
        </NotEmptyList>
      )}
      {footer}
    </>
  )
}
