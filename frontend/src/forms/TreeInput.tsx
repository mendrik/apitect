import clsx from 'clsx'
import { cond, not, propEq } from 'ramda'
import React, { HTMLAttributes, ReactNode, useRef, useState } from 'react'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useOnClickOutside } from 'usehooks-ts'

import { DeleteIcon } from '../components/generic/DeleteIcon'
import { Scrollable } from '../components/generic/Scrollable'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Fn, Jsx, Maybe } from '../shared/types/generic'
import { preventDefault as pd } from '../utils/preventDefault'
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
  top: calc(100% + 5px);
  width: 100%;
  z-index: 1;
  border: 1px solid #ececec;
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgba(120, 120, 120, 0.2);
  background-color: white;
`

const Selected = styled.div`
  &:not(:empty):focus ~ .delete {
    display: flex;
    top: 20px;
    right: 14px;
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

  useOnClickOutside(target, () => setShow(false))

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
      <NodeSelector hidden={!show}>
        <Scrollable>
          <div className="p-2">
            <TextInput label="form.fields.search" name="search" />
          </div>
          <ul>
            <li onClick={() => setSelected({ value: { name: 'hallo' } } as any)}>A</li>
            <li>B</li>
            <li>C</li>
          </ul>
        </Scrollable>
      </NodeSelector>
      <label>{t(label)}</label>
    </StyledTreeInput>
  )
}
