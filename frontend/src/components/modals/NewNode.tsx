import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { cond, keys, pipe, propEq, toLower, values, when } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { createNodeFx } from '../../events/tree'
import { SocketForm } from '../../forms/SocketForm'
import { TextInput } from '../../forms/TextInput'
import { useLocation } from '../../hooks/useLocation'
import { Node } from '../../shared/types/domain/node'
import { iconMap, NodeType } from '../../shared/types/domain/nodeType'
import { NewNode as NewNodeType, TNewNode } from '../../shared/types/forms/newNode'
import { Fn, Maybe } from '../../shared/types/generic'
import { capitalize, spaceOrEnter } from '../../shared/utils/ramda'
import { preventDefault as pd } from '../../utils/preventDefault'
import { ModalFC } from '../ModalStub'

const COLS = 4

const TypeGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;

  > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    height: 70px;
    cursor: pointer;

    &.selected,
    &.selected:hover {
      background-color: #d9e8b5;
      border-color: #98a773;
    }

    &:hover {
      background-color: rgba(120, 120, 120, 0.1);
    }
  }
`

export type SelectedNode = {
  selectedNode: Maybe<Node>
}

const NewNode: ModalFC = ({ close }) => {
  const {
    state: { selectedNode }
  } = useLocation<SelectedNode>()
  const form = useForm<NewNodeType>({
    resolver: zodResolver(TNewNode),
    defaultValues: {
      parentNode: selectedNode?.id,
      nodeType: NodeType.Object,
      name: ''
    }
  })

  const focus =
    (delta: number, len = keys(NodeType).length) =>
    () => {
      const current = parseInt((document.activeElement as HTMLElement)?.dataset['grid'] ?? '0', 10)
      return document.getElementById(`grid-${(current + delta) % len}`)?.focus()
    }

  const keyMap = cond([
    [propEq('key', 'ArrowDown'), pd(focus(COLS))],
    [propEq('key', 'ArrowUp'), pd(focus(-COLS))],
    [propEq('key', 'ArrowRight'), pd(focus(1))],
    [propEq('key', 'ArrowLeft'), pd(focus(-1))]
  ]) as Fn

  return (
    <SocketForm form={form} onValid={createNodeFx} close={close}>
      <TextInput
        name="name"
        label="form.fields.nodeName"
        type="text"
        autoFocus
        options={{ required: true }}
      />
      <Controller
        name="nodeType"
        defaultValue={NodeType.Object}
        render={({ field }) => (
          <TypeGrid role="grid" data-wrap-cols="true" data-wrap-rows="true" onKeyDown={keyMap}>
            {mapIndexed((nodeType, idx) => {
              const Icon = iconMap[nodeType]
              return (
                <li
                  key={nodeType}
                  role="gridcell"
                  id={`grid-${idx}`}
                  data-grid={idx}
                  tabIndex={0}
                  onClick={() => field.onChange(nodeType)}
                  onKeyDown={when(spaceOrEnter, () => field.onChange(nodeType))}
                  className={clsx({ selected: field.value === nodeType })}
                >
                  <Icon focusable="false" role="img" size={30} stroke={1} />
                  {pipe(toLower, capitalize)(nodeType)}
                </li>
              )
            }, values(NodeType))}
          </TypeGrid>
        )}
      />
    </SocketForm>
  )
}

export default NewNode
