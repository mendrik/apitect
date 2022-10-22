import styled from 'styled-components'

export const Layout = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  max-height: 100vh;
  width: 100vw;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr max-content;
`
