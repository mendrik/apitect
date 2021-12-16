import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'
import { $arrayDrawer } from '~stores/$arrayDrawer'

import { stretchIn } from '../../animations/stretchIn'
import { Palette } from '../../css/colors'

const WrapperSx = styled.div`
  max-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: row;
`

const SidePanelSx = styled(motion.div)`
  overflow-x: hidden;
  border-left: 1px solid ${Palette.border};
  width: 0;
`

export const ArraySidePanel = ({ children }: Jsx) => {
  const open = useStore($arrayDrawer)
  return (
    <WrapperSx>
      {children}
      <AnimatePresence>
        {open && (
          <SidePanelSx id="panel" {...stretchIn}>
            array
          </SidePanelSx>
        )}
      </AnimatePresence>
    </WrapperSx>
  )
}
