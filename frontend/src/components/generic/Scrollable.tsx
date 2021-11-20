import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Jsx } from '../../shared/types/generic'

type OwnProps = HTMLAttributes<HTMLDivElement>

const Scroller = styled.div`
  overflow-y: scroll;
  overscroll-behavior: contain;
  max-height: 100%;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: transparent;
    -webkit-box-shadow: 0 0 1px rgb(255 255 255 / 50%);
    opacity: 0;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #b6b6b6;
  }
`

export const Scrollable = ({ children, ...props }: Jsx<OwnProps>) => {
  return <Scroller {...props}>{children}</Scroller>
}
