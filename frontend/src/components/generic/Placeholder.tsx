import { range } from 'ramda'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { NodeId } from '~shared/types/domain/node'
import { Jsx } from '~shared/types/generic'

type OwnProps = HTMLAttributes<HTMLDivElement>

const StyledPlaceholder = styled.div`
  @keyframes loading-slide {
    to {
      transform: translateX(-50%) skewX(30deg);
    }
  }
  display: block;
  width: 100%;
  height: 12px;
  margin-bottom: 0px;
  background-color: #efefef;
  position: relative;
  z-index: 0;
  overflow: hidden;
  border-radius: 2px;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    width: 400%;
    background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 10px,
      #ececec 10px,
      #ececec 20px
    );
    transform: skewX(30deg);
    transform-origin: bottom left;
    animation: loading-slide 8s linear infinite;
  }
`

const Wrapper = styled.div`
  padding: 4px 0;
  @keyframes blend-in {
    to {
      opacity: 1;
    }
  }
  opacity: 0;
  animation: blend-in 1s linear forwards;
  animation-delay: 0.3s;
  height: 24px;
`

export const Placeholder = ({ ...props }: Jsx<OwnProps>) => (
  <Wrapper>
    <StyledPlaceholder {...props}>&nbsp;</StyledPlaceholder>
  </Wrapper>
)

const StyledPlaceholderList = styled.ul`
  @keyframes blend-in {
    to {
      opacity: 1;
    }
  }
  margin: 0;
  padding: 0;
  opacity: 0;
  animation: blend-in 1s linear forwards;
  animation-delay: 0.3s;
`

Placeholder.List = ({ lines }: { lines: number }) => (
  <StyledPlaceholderList>
    {range(1, lines).map(n => (
      <Placeholder key={n} />
    ))}
  </StyledPlaceholderList>
)

Placeholder.Value = ({ nodeId }: { nodeId: NodeId }) => (
  <Placeholder
    key={nodeId}
    tabIndex={0}
    style={{
      width: `${30 + (parseInt(nodeId.replace(/[^\d]/g, ''), 10) % 50)}%`,
      borderRadius: 6
    }}
  />
)
