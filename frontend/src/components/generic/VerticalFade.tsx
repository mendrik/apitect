import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useEvent } from '../../hooks/useEvent'
import { Jsx } from '../../shared/types/generic'

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
  const handler = useCallback((ev: Event) => {
    console.log(ev)
  }, [])
  const ref = useEvent<HTMLDivElement>('scroll', handler, undefined, { passive: true })
  return <VerticalFadeStyled ref={ref}>{children}</VerticalFadeStyled>
}
