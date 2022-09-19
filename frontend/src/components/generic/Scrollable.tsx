import { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { VerticalFade } from './VerticalFade'

type OwnProps = {
  fade?: boolean
} & HTMLAttributes<HTMLDivElement>

const Scroller = styled.div`
  overflow-y: scroll;
  overscroll-behavior: contain;
  max-height: 100%;
`

const Div = styled.div`
  max-height: 100%;
`

export const Scrollable = ({ fade = false, children, ...props }: OwnProps) => {
  const Wrapper = fade ? VerticalFade : Div
  return (
    <Wrapper {...props}>
      <Scroller className="custom-scrollbars">{children}</Scroller>
    </Wrapper>
  )
}
