import clsx from 'clsx'
import React, { FC, HTMLAttributes } from 'react'
import { Icon as IconProp, PlusCircle } from 'react-feather'
import styled from 'styled-components'

import { useViews } from '../../hooks/useViews'
import { Icon } from './Icon'
import { Scale, Tuple } from './Tuple'

type OwnProps = {
  icon: IconProp
} & HTMLAttributes<HTMLDivElement>

const EmptyEdit = styled.input`
  width: 100%;
  margin: 2px;
  border: 1px dotted #ddd;
  background-color: white;
  border-radius: 2px;
  font-size: 1rem;
  padding-left: 5px;
  &:focus,
  &:active {
    border: 1px solid 0c55bf;
  }
`

enum View {
  Initial,
  Edit
}

export const NewItem: FC<OwnProps> = ({ className, icon, ...props }) => {
  const { view, editView } = useViews(View.Initial, View)
  return (
    <div className={clsx('', className)} {...props}>
      <Tuple first={Scale.CONTENT} second={Scale.MAX}>
        <Icon icon={PlusCircle} onClick={editView} />
        {view === View.Edit ? <EmptyEdit className="me-2" /> : <div className="input-spacer" />}
      </Tuple>
    </div>
  )
}
