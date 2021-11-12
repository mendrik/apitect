import React from 'react'
import styled from 'styled-components'

import { Jsx } from '../shared/types/generic'

const Panel = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  > *:first-child {
    flex: 0;
  }
  > *:not(:first-child) {
    flex: 1;
  }
`

export const AppFrame = ({ children }: Jsx) => {
  return <Panel className="bg-light">{children}</Panel>
}
