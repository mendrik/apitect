import { prop } from 'ramda'
import React, { FC } from 'react'

import useInstantPromise from '../hooks/useInstantPromise'
import { useQueryParams } from '../hooks/useQueryParams'
import { Loader } from './Loader'

type OwnProps = {
  from: () => Promise<{ default: FC }>
  name: string
}

export const LazyModal: FC<OwnProps> = ({ name, from }) => {
  const { modal } = useQueryParams()
  const modalState = useInstantPromise<FC>(
    `loading-modal-${name}`,
    () => from().then(prop('default')),
    () => modal === name
  )
  if (modalState.status === 'error') {
    return console.error(modalState.error)
  }
  return modal === name ? (
    <div className="modal">
      {modalState.status === 'running' || modalState.data == null ? (
        <Loader />
      ) : (
        <modalState.data />
      )}
    </div>
  ) : (
    (null as any)
  )
}
