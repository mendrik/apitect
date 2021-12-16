import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'
import { $arrayDrawer } from '~stores/$arrayDrawer'

import { stretchIn } from '../../animations/stretchIn'
import { arrayPanelSize } from '../../constants'
import { Palette } from '../../css/colors'
import { ArrayPanelHeader } from './ArrayPanelHeader'

const WrapperSx = styled(motion.div)`
  min-height: calc(100vh - 57px);
  width: calc(100% + ${arrayPanelSize}px);
  display: flex;
  flex-direction: row;

  > * {
    flex: auto 1 1;
  }
`

const SidePanelSx = styled.div`
  overflow-x: hidden;
  border-left: 1px solid ${Palette.border};
  min-width: ${arrayPanelSize}px;
`

export const ArraySidePanel = ({ children }: Jsx) => {
  const open = useStore($arrayDrawer)
  return (
    <WrapperSx variants={stretchIn} animate={open ? 'open' : 'hidden'}>
      {children}
      <SidePanelSx id="panel">
        <ArrayPanelHeader />
      </SidePanelSx>
    </WrapperSx>
  )
}
