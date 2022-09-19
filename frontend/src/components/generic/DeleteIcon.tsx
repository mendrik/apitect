import { IconCircleX } from '@tabler/icons'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledDelete = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fefefe;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;

  &:hover {
    background-color: #efefef;
  }
`

export const DeleteIcon = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <StyledDelete {...props} className={clsx('delete', className)}>
    <IconCircleX stroke={1} width={16} height={16} />
  </StyledDelete>
)
