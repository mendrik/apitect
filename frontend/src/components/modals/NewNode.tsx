import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { pipe, toLower, values, when } from 'ramda'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { ErrorInfo } from '~forms/ErrorInfo'
import { SocketForm } from '~forms/SocketForm'
import { TextInput } from '~forms/TextInput'
import { useModal } from '~hooks/useModal'
import { iconMap, NodeType } from '~shared/types/domain/nodeType'
import { NewNode as NewNodeType, TNewNode } from '~shared/types/forms/newNode'
import { OptNode } from '~shared/types/generic'
import { capitalize } from '~shared/utils/ramda'
import { $canCreateArray, $canCreateNode } from '~stores/$selectedNode'

import { Palette } from '../../css/colors'
import { insetFocus } from '../../css/insetFocus'
import { createNodeFx } from '../../events/tree'
import { spaceOrEnter } from '../../utils/eventUtils'
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

    ${insetFocus}

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

const NewNode = () => {
  const canCreateNode = useStore($canCreateNode)
  const canAddArray = useStore($canCreateArray)
  const parentNode = useModal<OptNode>()

  const form = useForm<NewNodeType>({
    resolver: zodResolver(TNewNode),
    defaultValues: {
      parentNode: parentNode?.value.id,
      nodeType: NodeType.Object,
      name: ''
    }
  })

  const arrayCheck = canAddArray || form.watch('nodeType') != NodeType.Array

  return (
    <SocketForm
      form={form}
      onValid={node => (arrayCheck ? createNodeFx(node) : Promise.reject())}
      submitButton="modals.newNode.submit"
    >
      <TextInput
        name="name"
        label="form.fields.nodeName"
        containerClasses="mb-3"
        type="text"
        autoFocus
        options={{ required: true }}
      />
      <Controller
        name="nodeType"
        defaultValue={NodeType.Object}
        render={({ field }) => (
          <TypeGrid role="grid" columns={4} ctrlKey={false}>
            {values(NodeType).map(nodeType => {
              const disabled = (nodeType === NodeType.Array && !canAddArray) || !canCreateNode
              const Icon = iconMap[nodeType]
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
      <ErrorInfo name="nodeType" />
    </SocketForm>
  )
}

export default NewNode
