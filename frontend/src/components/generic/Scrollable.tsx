import React, { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

type OwnProps = HTMLAttributes<HTMLDivElement>

const Scroller = styled.div`
  display: contents;
  overflow-y: scroll;
  overscroll-behavior: contain;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #b6b6b6;
    -webkit-box-shadow: 0 0 1px rgb(255 255 255 / 50%);
  }
`

export const Scrollable: FC<OwnProps> = ({ children, ...props }) => {
  return <Scroller {...props}>{children}</Scroller>
}
