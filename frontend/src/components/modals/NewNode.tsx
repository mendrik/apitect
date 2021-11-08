import { useStore } from 'effector-react'
import React from 'react'

import appStore from '../../stores/appStore'
import { ModalFC } from '../LazyModal'

const NewNode: ModalFC = ({}) => {
  const { selectedNode } = useStore(appStore)
  return <div>{selectedNode?.name}</div>
}

export default NewNode
