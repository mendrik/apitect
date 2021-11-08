import { ioTsResolver } from '@hookform/resolvers/io-ts'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { map, pipe, toLower, values } from 'ramda'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { ButtonRow } from '../../forms/ButtonRow'
import { SocketForm } from '../../forms/SocketForm'
import { SubmitButton } from '../../forms/SubmitButton'
import { TextInput } from '../../forms/TextInput'
import { iconMap, NodeType } from '../../shared/types/domain/nodeType'
import { NewNode as NewNodeType, TNewNode } from '../../shared/types/forms/newNode'
import { capitalize } from '../../shared/utils/ramda'
import appStore from '../../stores/appStore'
import { ModalFC } from '../LazyModal'
import { Icon } from '../generic/Icon'

const TypeGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
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

const NewNode: ModalFC = ({}) => {
  const { selectedNode } = useStore(appStore)
  const form = useForm<NewNodeType>({
    resolver: ioTsResolver(TNewNode),
    defaultValues: {
      parentNode: selectedNode?.id,
      type: NodeType.Object
    }
  })

  return (
    <SocketForm form={form} onValid={close}>
      <TextInput
        name="name"
        label="form.fields.nodeName"
        type="text"
        options={{ required: true }}
      />
      <Controller
        name="type"
        render={({ field }) => (
          <TypeGrid>
            {map(
              nodeType => (
                <li
                  key={nodeType}
                  onClick={() => field.onChange(nodeType)}
                  className={clsx({ selected: field.value === nodeType })}
                >
                  <Icon icon={iconMap[nodeType]} size={30} />
                  {pipe(toLower, capitalize)(nodeType)}
                </li>
              ),
              values(NodeType)
            )}
          </TypeGrid>
        )}
      />
      <ButtonRow className="mt-4">
        <SubmitButton localeKey="modals.newNode.submit" />
      </ButtonRow>
    </SocketForm>
  )
}

export default NewNode
