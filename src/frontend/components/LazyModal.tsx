import { always, prop } from 'ramda'
import React, { FC, useCallback, useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Fn } from '../../utils/types'
import { removeParams } from '../../utils/url'
import { progressContext } from '../contexts/progress'
import useInstantPromise from '../hooks/useInstantPromise'
import { useQueryParams } from '../hooks/useQueryParams'

export type ModalFC = FC<{
  close: Fn
}>

type OwnProps = {
  from: () => Promise<{ default: ModalFC }>
  name: string
  title: TFuncKey
}

export const LazyModal: FC<OwnProps> = ({ name, from, title }) => {
  const { modal } = useQueryParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { working } = useContext(progressContext)
  const [show, setShow] = useState(true)
  const modalMatch = modal === name
  const modalState = useInstantPromise<ModalFC>(
    `loading-modal-${name}`,
    () => from().then(prop('default')),
    always(modalMatch)
  )

  const close = useCallback(() => {
    navigate(removeParams(['modal']), { replace: true })
    setShow(true)
  }, [navigate])

  if (modalState.status === 'error') {
    return console.error(modalState.error)
  }

  return modalMatch && modalState.data != null ? (
    <Modal backdrop="static" show={show} onHide={() => setShow(false)} onExited={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(title)}</Modal.Title>
      </Modal.Header>
      <div className="progress" style={{ height: 4 }}>
        {working && (
          <div className="progress-bar progress-bar-striped progress-bar-animated w-100" />
        )}
      </div>
      <Modal.Body>
        <modalState.data close={close} />
      </Modal.Body>
    </Modal>
  ) : (
    (null as any)
  )
}
