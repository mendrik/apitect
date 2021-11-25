import { always, prop } from 'ramda'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Fn, Jsx } from 'shared/types/generic'
import { removeParams } from 'shared/utils/url'

import useInstantPromise from '../hooks/useInstantPromise'
import { useQueryParams } from '../hooks/useQueryParams'
import { ModalNames } from '../shared/types/modals'

export type ModalFC = ({ close }: { close: Fn }) => JSX.Element | null

type OwnProps = {
  from: () => Promise<{ default: ModalFC }>
  name: ModalNames
  title: TFuncKey
  titleOptions?: Record<string, string>
}

export const ModalStub = ({ name, from, title, titleOptions }: Jsx<OwnProps>) => {
  const { modal } = useQueryParams()
  const modalMatch = modal === name

  const { t } = useTranslation()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)

  const modalState = useInstantPromise<ModalFC>(
    `loading-modal-${name}`,
    () => from().then(prop('default')),
    always(modalMatch)
  )

  const close = () => {
    navigate(removeParams(['modal']), { replace: true })
    setShow(true)
  }

  if (modalState.status === 'error') {
    return console.error(modalState.error)
  }

  return modalMatch && modalState.data != null ? (
    <Modal show={show} onHide={() => setShow(false)} onExited={close} centered enforceFocus>
      <Modal.Header closeButton>
        <Modal.Title>{t(title, titleOptions)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <modalState.data close={close} />
      </Modal.Body>
    </Modal>
  ) : (
    (null as any)
  )
}
