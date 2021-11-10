import { ioTsResolver } from '@hookform/resolvers/io-ts'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { map, pipe, toLower, values, when } from 'ramda'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ButtonRow } from '../../forms/ButtonRow'
import { SocketForm } from '../../forms/SocketForm'
import { SubmitButton } from '../../forms/SubmitButton'
import { TextInput } from '../../forms/TextInput'
import { iconMap, NodeType } from '../../shared/types/domain/nodeType'
import { NewNode as NewNodeType, TNewNode } from '../../shared/types/forms/newNode'
import { capitalize, spaceOrEnter } from '../../shared/utils/ramda'
import $appStore from '../../stores/$appStore'
import { ModalFC } from '../LazyModal'

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

const NewNode: ModalFC = ({ close }) => {
  const { t } = useTranslation()
  const { selectedNode } = useStore($appStore)

  const form = useForm<NewNodeType>({
    resolver: ioTsResolver(TNewNode),
    defaultValues: {
      parentNode: selectedNode?.id,
      nodeType: NodeType.Object,
      name: ''
    }
  })

  return (
    <SocketForm submitMessage="NEW_NODE" form={form} onSuccess={close}>
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
          <TypeGrid role="grid" data-wrap-cols="true" data-wrap-rows="true">
            {map(nodeType => {
              const Icon = iconMap[nodeType]
              return (
                <li
                  key={nodeType}
                  role="gridcell"
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
      <ButtonRow className="mt-4">
        <Button variant="outline-secondary" onClick={close}>
          {t('common.cancel')}
        </Button>
        <SubmitButton localeKey="modals.newNode.submit" />
      </ButtonRow>
    </SocketForm>
  )
}

export default NewNode
