import clsx from 'clsx'
import { cond, not, propEq, propOr } from 'ramda'
import { isNotNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import React, { HTMLAttributes, ReactNode, useRef, useState } from 'react'
import { Overlay } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { DeleteIcon } from '../components/generic/DeleteIcon'
import { Scrollable } from '../components/generic/Scrollable'
import { useFocusOutside } from '../hooks/useFocusOutside'
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
  border: 1px solid #ececec;
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgba(120, 120, 120, 0.2);
  background-color: white;
`

const OverlayStub = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`

const Selected = styled.div`
  &:not(:empty):focus ~ .delete {
    display: flex;
    top: 20px;
    right: 14px;
  }
`

const NodeTree = styled.ul`
  margin: 0.75rem;

  &,
  ul {
    margin: ;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 0.25rem 0;
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
          <Scrollable fade style={{ height: 300 }}>
            <div className="p-2">
              <TextInput label="form.fields.search" name="search" />
            </div>
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
  const hasChildren = isNotNilOrEmpty(node.children)
  return (
    <li>
      <div>{itemRender(node.value)}</div>
      {hasChildren && (
        <ul>
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
    </li>
  )
}
