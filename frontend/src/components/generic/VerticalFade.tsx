import clsx from 'clsx'
import { EventHandler, HTMLAttributes, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useEvent } from '~hooks/useEvent'

const VerticalFadeStyled = styled.div`
  --scrollOpacityTop: 0;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 16px;
    height: 50px;
    border-radius: 4px;
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
    right: 16px;
    height: 50px;
    border-radius: 4px;
    background: linear-gradient(0deg, white, transparent);
    display: block;
    pointer-events: none;
    opacity: var(--scrollOpacityBottom);
  }
`

export const VerticalFade = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null)

  const handler = useCallback<EventHandler<any>>(
    (ev: Event) => {
      const target = ev.target as HTMLElement
      const opacityTop = 1 - Math.max(50 - target.scrollTop, 0) / 50
      const opacityBottom =
        Math.min(target.scrollHeight - target.scrollTop - target.offsetHeight, 50) / 50
      ref.current?.style.setProperty('--scrollOpacityTop', `${opacityTop}`)
      ref.current?.style.setProperty('--scrollOpacityBottom', `${opacityBottom}`)
    },
    [ref]
  )

  useEvent<HTMLDivElement>('scroll', handler, ref, {
    passive: true,
    capture: true
  })

  return (
    <VerticalFadeStyled ref={ref} {...props} className={clsx(className, 'fader')}>
      {children}
    </VerticalFadeStyled>
  )
}
