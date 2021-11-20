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

export const VerticalFade = ({ children }: Jsx) => {
  const handler = useCallback((ev: Event) => {
    const target = ev.target as HTMLElement
    const opacityTop = 1 - Math.max(50 - target.scrollTop, 0) / 50
    const opacityBottom =
      Math.min(target.scrollHeight - target.scrollTop - target.offsetHeight, 50) / 50
    ref.current?.style.setProperty('--scrollOpacityTop', `${opacityTop}`)
    ref.current?.style.setProperty('--scrollOpacityBottom', `${opacityBottom}`)
  }, [])
  const ref = useEvent<HTMLDivElement>('scroll', handler, undefined, {
    passive: true,
    capture: true
  })
  return <VerticalFadeStyled ref={ref}>{children}</VerticalFadeStyled>
}
