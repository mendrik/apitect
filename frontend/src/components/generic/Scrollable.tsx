import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Jsx } from '../../shared/types/generic'
import { VerticalFade } from './VerticalFade'

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

const VerticalFadeStyled = styled.div`
  --scrollOpacityTop: 0;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 7px;
    height: 50px;
    background: linear-gradient(0deg, transparent, white);
    display: block;
    pointer-events: none;
    opacity: var(--scrollOpacityTop);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 7px;
    height: 50px;
    background: linear-gradient(0deg, white, transparent);
    display: block;
    pointer-events: none;
    opacity: var(--scrollOpacityBottom);
  }
`

export const Scrollable = ({ children, ...props }: Jsx<OwnProps>) => {
  return (
    <VerticalFade {...props}>
      <Scroller>{children}</Scroller>
    </VerticalFade>
  )
}
