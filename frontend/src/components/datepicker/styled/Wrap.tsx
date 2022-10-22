import styled from 'styled-components'

export const Wrap = styled.li`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: black;
  user-select: none;
  &:last-child {
    padding-bottom: 0;
  }
`
