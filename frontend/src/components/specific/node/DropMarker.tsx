import { useDndContext } from '@dnd-kit/core'
import { Collision } from '@dnd-kit/core/dist/utilities/algorithms'
import { useStore } from 'effector-react'
import { clamp, equals, head, max, min, pathOr, pipe, prop, propEq } from 'ramda'
import styled from 'styled-components'
import { next } from '~shared/utils/ramda'
import { $treeStore } from '~stores/$treeStore'
import { $visibleNodes } from '~stores/$visibileNodes'

import { treeIndent } from '../../../constants'

type OwnProps = {
  depth: number
}

const DropMarkerSx = styled.div`
  position: relative;
  height: 5px;
  background-color: rgb(200, 220, 255);
  border-radius: 3px;
`

export const DropMarker = ({ depth }: OwnProps) => {
  const collision = pipe(prop('collisions'), head)(useDndContext()) as Collision
  const visualNodes = useStore($visibleNodes)
  const tree = useStore($treeStore)

  const nextNodeId = next(equals(collision.id))(visualNodes)
  const nextNode = tree.first(propEq('id', nextNodeId))
  const nextDepth = nextNode?.depth ?? 1

  const currentX = pathOr(0, ['data', 'indent'], collision)
  const indent = (currentX / treeIndent) | 0

  const left =
    nextDepth - depth === 1
      ? depth + 1
      : clamp(min(depth, nextDepth), max(depth, nextDepth), depth + indent)

  return <DropMarkerSx style={{ left: `${left - depth}rem` }}></DropMarkerSx>
}
