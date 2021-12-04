import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { VerticalFade } from './VerticalFade'

type OwnProps = {
  fade?: boolean
} & HTMLAttributes<HTMLDivElement>

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

const Div = styled.div`
  max-height: 100%;
`

export const Scrollable = ({ fade = false, children, ...props }: Jsx<OwnProps>) => {
  const Wrapper = fade ? VerticalFade : Div
  return (
    <Wrapper {...props}>
      <Scroller>{children}</Scroller>
    </Wrapper>
  )
}
