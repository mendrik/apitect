import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { pipe, toLower, values, when } from 'ramda'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { SocketForm } from '~forms/SocketForm'
import { TextInput } from '~forms/TextInput'
import { useLocation } from '~hooks/useLocation'
import { Node } from '~shared/types/domain/node'
import { iconMap, NodeType } from '~shared/types/domain/nodeType'
import { NewNode as NewNodeType, TNewNode } from '~shared/types/forms/newNode'
import { Maybe } from '~shared/types/generic'
import { capitalize } from '~shared/utils/ramda'
import { $canCreateNode, $selectedArrayNode } from '~stores/$selectedNode'

import { Palette } from '../../css/colors'
import { createNodeFx } from '../../events/tree'
import { spaceOrEnter } from '../../utils/eventUtils'
import { ModalFC } from '../ModalStub'
import { FocusNavigator } from '../generic/FocusNavigator'

const COLS = 4

const TypeGrid = styled(FocusNavigator)`
  display: grid;
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${Palette.border};
    border-radius: 0.25rem;
    height: 70px;
    cursor: pointer;

    &.selected,
    &.selected:hover {
      background-color: ${Palette.selected};
      border-color: ${Palette.selectedBorder};
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
  const arrayNode = useStore($selectedArrayNode)
  const { state } = useLocation<SelectedNode>()
  const canCreateNode = useStore($canCreateNode)
  const selectedNode = state?.selectedNode
  const form = useForm<NewNodeType>({
    resolver: zodResolver(TNewNode),
    defaultValues: {
      parentNode: selectedNode?.id,
      nodeType: selectedNode?.nodeType ?? NodeType.Object,
      name: ''
    }
  })

  return (
    <SocketForm
      form={form}
      onValid={createNodeFx}
      close={close}
      submitButton="modals.newNode.submit"
    >
      <TextInput
        name="name"
        label="form.fields.nodeName"
        containerClassNames="mb-3"
        type="text"
        autoFocus
        options={{ required: true }}
      />
      <Controller
        name="nodeType"
        defaultValue={NodeType.Object}
        render={({ field }) => (
          <TypeGrid role="grid" columns={4}>
            {values(NodeType).map((nodeType, _, __, Icon = iconMap[nodeType]) => {
              const disabled = (nodeType === NodeType.Array && arrayNode != null) || !canCreateNode
              return (
                <div
                  key={nodeType}
                  role="gridcell"
                  tabIndex={0}
                  onClick={() => field.onChange(nodeType)}
                  onKeyDown={when(spaceOrEnter, () => field.onChange(nodeType))}
                  className={clsx({
                    selected: field.value === nodeType && !disabled,
                    disabled
                  })}
                >
                  <Icon focusable="false" role="img" size={30} stroke={1} />
                  {pipe(toLower, capitalize)(nodeType)}
                </div>
              )
            })}
          </TypeGrid>
        )}
      />
    </SocketForm>
  )
}

export default NewNode
