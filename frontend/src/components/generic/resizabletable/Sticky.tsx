import styled from 'styled-components'

export const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 103%; // prevents bg gap on different zoom levels
  background: white;
  z-index: 1;
`
