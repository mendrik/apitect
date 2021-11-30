import { range } from 'ramda'
import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Jsx } from '../../shared/types/generic'

type OwnProps = HTMLAttributes<HTMLDivElement>

const StyledPlaceholder = styled.div`
  @keyframes loading-slide {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }

  height: 16px;
  background-clip: content-box;
  background-image: repeating-linear-gradient(110deg, transparent, #ddd 20px, transparent 40px);
  background-size: 200% 100%;
  background-color: #efefef;
  animation: loading-slide 4s linear infinite;
`

const Wrapper = styled.div`
  padding: 4px 0;
  overflow: hidden;
`

export const Placeholder = ({ ...props }: Jsx<OwnProps>) => (
  <Wrapper>
    <StyledPlaceholder {...props}>&nbsp;</StyledPlaceholder>
  </Wrapper>
)

const StyledPlaceholderList = styled.ul`
  margin: 0;
  padding: 0;
`

Placeholder.List = ({ lines }: { lines: number }) => (
  <StyledPlaceholderList>
    {range(1, lines).map(() => (
      <Placeholder />
    ))}
  </StyledPlaceholderList>
)
