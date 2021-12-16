import { useStore } from 'effector-react'
import React from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'
import { $arrayDrawer } from '~stores/$arrayDrawer'

import { Palette } from '../../css/colors'

const WrapperSx = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: row;

  > :first-child {
    flex: 1;
  }
`

const SidePanelSx = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: row;
  min-width: 250px;
  flex: 0;
  border-left: 1px solid ${Palette.border};
`

export const ArraySidePanel = ({ children }: Jsx) => {
  const open = useStore($arrayDrawer)
  return (
    <WrapperSx>
      {children}
      {open && <SidePanelSx>array</SidePanelSx>}
    </WrapperSx>
  )
}
