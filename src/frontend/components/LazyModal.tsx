import { always, prop } from 'ramda'
import React, { FC, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { removeParams } from '../../utils/url'
import useInstantPromise from '../hooks/useInstantPromise'
import { useQueryParams } from '../hooks/useQueryParams'

type OwnProps = {
  from: () => Promise<{ default: FC }>
  name: string
  title: TFuncKey
}

export const LazyModal: FC<OwnProps> = ({ name, from, title }) => {
  const { modal } = useQueryParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const modalMatch = modal === name
  const modalState = useInstantPromise<FC>(
    `loading-modal-${name}`,
    () => from().then(prop('default')),
    always(modalMatch)
  )

  if (modalState.status === 'error') {
    return console.error(modalState.error)
  }

  return modalMatch && modalState.data != null ? (
    <Modal
      backdrop="static"
      show={show}
      onHide={() => setShow(false)}
      onExited={() => {
        navigate(removeParams(['modal']), { replace: true })
        setShow(true)
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <modalState.data />
      </Modal.Body>
    </Modal>
  ) : (
    (null as any)
  )
}
