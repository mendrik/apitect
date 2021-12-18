import { useStore, useStoreMap } from 'effector-react'
import { motion } from 'framer-motion'
import { cond, includes, map, prop } from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { NodeType } from '~shared/types/domain/nodeType'
import { Jsx } from '~shared/types/generic'
import { $selectedNodePath, $sidePanelOpen } from '~stores/$sidePanel'

import { stretchIn } from '../../animations/stretchIn'
import { detailsPanelSize, navbarHeight } from '../../constants'
import { Palette } from '../../css/colors'
import { ArraySidePanel } from '../sidepanels/array'
import { FileSidePanel } from '../sidepanels/file'

const WrapperSx = styled(motion.div)`
  height: calc(100vh - ${navbarHeight}px);
  width: calc(100% + ${detailsPanelSize}px);
  display: flex;
  flex-direction: row;

  > * {
    overflow-y: auto;
  }
`

const SidePanelSx = styled.div`
  border-left: 1px solid ${Palette.border};
  min-width: ${detailsPanelSize}px;
`

const getPanel: (path: NodeType[]) => JSX.Element | null = cond([
  [includes<NodeType>(NodeType.Binary), () => <FileSidePanel />],
  [includes(NodeType.Array), () => <ArraySidePanel />]
])

export const SidePanel = ({ children }: Jsx) => {
  const open = useStore($sidePanelOpen)
  const nodePath = useStoreMap($selectedNodePath, map(prop('nodeType')))

  return (
    <WrapperSx variants={stretchIn} animate={open ? 'open' : 'hidden'}>
      {children}
      <SidePanelSx id="panel">{getPanel(nodePath)}</SidePanelSx>
    </WrapperSx>
  )
}
