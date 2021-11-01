import { useStore } from 'effector-react'
import React, { FC, useCallback, useContext } from 'react'
import { Menu } from 'react-feather'

import { socketContext } from '../../contexts/socket'
import { Operation } from '../../shared/types/clientMessages'
import { treeStore } from '../../stores/treeStore'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'

type OwnProps = {
  prop?: string
}

export const ProjectTreeHeader: FC<OwnProps> = ({ prop, children }) => {
  const { send } = useContext(socketContext)
  const root = useStore(treeStore)
  const createNode = useCallback(() => {
    send({
      type: 'NODE',
      operation: Operation.Upsert,
      position: root.children.length
    })
  }, [send, root])

  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div>Project tree</div>
      <Icon icon={Menu} onClick={createNode} />
    </Tuple>
  )
}
