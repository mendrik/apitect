import styled from 'styled-components'

export const DaySx = styled.div`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  max-width: 40px;
  cursor: pointer;

  &.off {
    color: transparent;
    pointer-events: none;
    cursor: default;
  }
`
