import React from 'react'
import styled from 'styled-components'

import { Jsx } from '../../shared/types/generic'

type OwnProps = {
  prop: string
}

const VerticalFadeStyled = styled.div`
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
  }
`

export const VerticalFade = ({ children }: Jsx) => {
  return <VerticalFadeStyled>{children}</VerticalFadeStyled>
}
