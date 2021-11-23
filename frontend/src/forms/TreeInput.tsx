import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import { cond, not, propEq, propOr, repeat } from 'ramda'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, { HTMLAttributes, ReactNode, useRef, useState } from 'react'
import { Overlay } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { DeleteIcon } from '../components/generic/DeleteIcon'
import { Scrollable } from '../components/generic/Scrollable'
import { Scale, Tuple } from '../components/generic/Tuple'
import { useFocusOutside } from '../hooks/useFocusOutside'
import { useOnActivate } from '../hooks/useOnActivate'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Fn, Jsx, Maybe } from '../shared/types/generic'
import { preventDefault as pd } from '../utils/preventDefault'
import { sameWidth } from '../utils/sameWidthMod'
import { ErrorInfo } from './ErrorInfo'
import { TextInput } from './TextInput'

type OwnProps<T> = {
  name: string
  tree: TreeNode<T>
  label: TFuncKey
  containerClasses: string
  onSelect: (node: T) => void
  itemRender: (node: T) => ReactNode
  selectionFilter: (node: TreeNode<T>) => boolean
} & HTMLAttributes<HTMLDivElement>

const StyledTreeInput = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;

  &.form-floating > .form-select {
    ~ label {
      opacity: 1;
      transform: none;
    }
    &:not(:empty) ~ label {
      opacity: 0.65;
      transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
    }
  }
`

const NodeSelector = styled.div`
  position: absolute;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 4px 5px 0px rgba(120, 120, 120, 0.2);
  border-top: 0;
  margin-top: -5px;
  background-color: white;
`

const OverlayStub = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`

const Selected = styled.div`
  &:focus:before {
    content: none;
  }

  &:not(:empty):focus ~ .delete {
    display: flex;
    top: 20px;
    right: 14px;
  }
`

const NodeTree = styled.ul`
  padding-left: 0.5rem !important;
  &,
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`

const NodeNode = styled.li<{ 'data-depth': number }>`
  font-weight: 400;
  padding: 0;
  background-color: 999;
  font-weight: 300;

  .name {
    padding: 0.25rem 0.5rem;
  }

  &[data-depth='${props => props['data-depth']}'] {
    & .icn {
      margin-left: ${props => props['data-depth'] - 1}rem;
    }
    background-color: rgb(
      ${props => repeat(Math.max(260 - props['data-depth'] * 5, 200), 3).join(',')}
    );
  }

  &.thick {
    font-weight: 400;
  }
`

export const TreeInput = <T extends any>({
  tree,
  label,
  name,
  onSelect,
  containerClasses,
  children,
  selectionFilter,
  itemRender,
  ...props
}: Jsx<OwnProps<T>>) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<Maybe<TreeNode<T>>>()
  const target = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)

  const keyMap = cond([
    [propEq('key', 'ArrowDown'), pd(() => 0)],
    [propEq('key', 'ArrowUp'), pd(() => 0)],
    [propEq('code', 'Enter'), pd(() => setShow(not))],
    [propEq('code', 'Space'), pd(() => setShow(not))],
    [
      propEq('code', 'Escape'),
      pd(() => {
        setShow(false)
        const el = target.current?.firstElementChild as Maybe<HTMLElement>
        el?.focus()
      })
    ]
  ]) as Fn

  useFocusOutside(target, () => setShow(false))

  return (
    <StyledTreeInput
      ref={target}
      onKeyDown={keyMap}
      className={clsx('form-floating', containerClasses)}
      {...props}
    >
      <Selected className="form-select" tabIndex={0} onClick={() => setShow(not)}>
        {selected?.value && itemRender(selected.value)}
      </Selected>
      <DeleteIcon
        onPointerDown={() => {
          setSelected(undefined)
          setShow(false)
        }}
      />
      <OverlayStub ref={container} />
      <Overlay
        target={target}
        container={container}
        popperConfig={{ modifiers: [sameWidth] }}
        flip
        show={show}
        placement="bottom-start"
      >
        <NodeSelector hidden={!show}>
          <div className="p-2">
            <TextInput label="form.fields.search" name="search" />
          </div>
          <Scrollable fade style={{ height: 300 }}>
            <NodeTree>
              {mapIndexed(
                child => (
                  <TreeInput.Node<T>
                    node={child}
                    itemRender={itemRender}
                    key={propOr('', 'id', child.value)}
                  />
                ),
                tree.children
              )}
            </NodeTree>
          </Scrollable>
        </NodeSelector>
      </Overlay>
      <label>{t(label)}</label>
      <ErrorInfo name={name} />
    </StyledTreeInput>
  )
}

type TreeNodeProps<T> = {
  node: TreeNode<T>
  itemRender: (node: T) => ReactNode
}

TreeInput.Node = <T extends any>({ node, itemRender }: Jsx<TreeNodeProps<T>>) => {
  const [open, setOpen] = useState(false)
  const hasChildren = isNotNilOrEmpty(node.children)
  const ref = useOnActivate<HTMLDivElement>(() => setOpen(not))
  return (
    <NodeNode data-depth={node.depth} data-children={hasChildren} className={clsx({ thick: open })}>
      <Tuple first={Scale.CONTENT} second={Scale.MAX}>
        <div tabIndex={0} className="icn" ref={ref}>
          {hasChildren && (
            <IconChevronRight
              stroke={1}
              width={16}
              height={16}
              className={clsx('rotate', { deg90: open })}
            />
          )}
        </div>
        <span tabIndex={0} className="name">
          {itemRender(node.value)}
        </span>
      </Tuple>
      {hasChildren && (
        <ul hidden={!open}>
          {mapIndexed(
            child => (
              <TreeInput.Node<T>
                node={child}
                itemRender={itemRender}
                key={propOr('', 'id', child.value)}
              />
            ),
            node.children
          )}
        </ul>
      )}
    </NodeNode>
  )
}
