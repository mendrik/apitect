import React from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

const Panel = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > *:first-child {
    flex: 0;
  }
  > *:not(:first-child) {
    flex: 1;
  }
`

export const AppFrame = ({ children }: Jsx) => (
  <Panel className="border-1 border-solid border-dark">{children}</Panel>
)
