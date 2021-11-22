import clsx from 'clsx'
import { cond, not, propEq } from 'ramda'
import React, { HTMLAttributes, useRef, useState } from 'react'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useOnClickOutside } from 'usehooks-ts'

import { Scrollable } from '../components/generic/Scrollable'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Fn, Jsx, Maybe } from '../shared/types/generic'
import { preventDefault as pd } from '../utils/preventDefault'
import { TextInput } from './TextInput'

type OwnProps<T> = {
  name: string
  tree: TreeNode<T>
  label: TFuncKey
  onSelect: (tag: T) => void
} & HTMLAttributes<HTMLDivElement>

const StyledTreeInput = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
`

const NodeSelector = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  width: 100%;
  z-index: 1;
  border: 1px solid #ececec;
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgba(120, 120, 120, 0.2);
`

export const TreeInput = <T extends any>({
  tree,
  label,
  name,
  onSelect,
  children,
  ...props
}: Jsx<OwnProps<T>>) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
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
    <StyledTreeInput ref={target} onKeyDown={keyMap} className={clsx('form-floating')} {...props}>
      <div className="form-select" tabIndex={0} onClick={() => setShow(not)}>
        Bla
      </div>
      <NodeSelector hidden={!show}>
        <Scrollable>
          <div className="p-2">
            <TextInput label="form.fields.search" name="search" />
          </div>
          <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
          </ul>
        </Scrollable>
      </NodeSelector>
      <label>{t(label)}</label>
    </StyledTreeInput>
  )
}
