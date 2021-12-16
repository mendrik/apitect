import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'
import { $arrayDrawerOpen } from '~stores/$arrayDrawerOpen'

import { stretchIn } from '../../animations/stretchIn'
import { arrayPanelSize } from '../../constants'
import { Palette } from '../../css/colors'
import { ArrayPanelHeader } from './ArrayPanelHeader'

const WrapperSx = styled(motion.div)`
  height: calc(100vh - 57px);
  width: calc(100% + ${arrayPanelSize}px);
  display: flex;
  flex-direction: row;

  > * {
    overflow-y: auto;
  }
`

const SidePanelSx = styled.div`
  border-left: 1px solid ${Palette.border};
  min-width: ${arrayPanelSize}px;
`

export const ArraySidePanel = ({ children }: Jsx) => {
  const open = useStore($arrayDrawerOpen)
  return (
    <WrapperSx variants={stretchIn} animate={open ? 'open' : 'hidden'}>
      {children}
      <SidePanelSx id="panel">
        <ArrayPanelHeader />
      </SidePanelSx>
    </WrapperSx>
  )
}
