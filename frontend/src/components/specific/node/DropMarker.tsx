import { useDndContext } from '@dnd-kit/core'
import { clamp, min, pathOr } from 'ramda'
import styled from 'styled-components'

import { treeIndent } from '../../../constants'

type OwnProps = {
  canMoveLeft: boolean
  depth: number
}

const DropMarkerSx = styled.div`
  position: relative;
  height: 5px;
  background-color: rgb(200, 220, 255);
  border-radius: 3px;
`

export const DropMarker = ({ depth, canMoveLeft }: OwnProps) => {
  const { collisions } = useDndContext()
  const currentX = pathOr(0, [0, 'data', 'indent'], collisions)
  const indent = canMoveLeft ? min(depth, (currentX / treeIndent) | 0) : 0
  const left = clamp(-depth, 0, indent)
  return <DropMarkerSx style={{ left: `${left}rem` }}></DropMarkerSx>
}
