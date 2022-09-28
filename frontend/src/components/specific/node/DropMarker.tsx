import { useDndContext } from '@dnd-kit/core'
import { pathOr } from 'ramda'
import { useEffect } from 'react'
import styled from 'styled-components'

import { treeIndent } from '../../../constants'

type OwnProps = {
  possibleDropLevels: number[]
}

const DropMarkerSx = styled.div`
  height: 5px;
  width: auto;
  background-color: rgb(200, 220, 255);
  border-radius: 3px;
`

export const DropMarker = ({ possibleDropLevels }: OwnProps) => {
  const { collisions } = useDndContext()
  const indent = pathOr(0, [0, 'data', 'indent'], collisions) / treeIndent

  useEffect(() => console.log(indent | 0, possibleDropLevels), [indent | 0, possibleDropLevels])

  return <DropMarkerSx />
}
