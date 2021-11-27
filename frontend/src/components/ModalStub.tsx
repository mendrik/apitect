import { prop } from 'ramda'
import React, { Suspense, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Fn, Jsx } from 'shared/types/generic'
import { removeParams } from 'shared/utils/url'

import { usePromise } from '../hooks/usePromise'
import { useQueryParams } from '../hooks/useQueryParams'
import { ModalNames } from '../shared/types/modals'
import { ErrorBoundary } from './generic/ErrorBoundary'
import { Loader } from './generic/Loader'

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

  const { result: ModalContent, trigger } = usePromise(() => from().then(prop('default')))
  useEffect(() => (modalMatch ? trigger() : void 0), [modalMatch, trigger])

  const close = () => {
    navigate(removeParams(['modal']), { replace: true })
    setShow(true)
  }

  return modalMatch && ModalContent != null ? (
    <Modal show={show} onHide={() => setShow(false)} onExited={close} centered enforceFocus>
      <Modal.Header closeButton>
        <Modal.Title>{t(title, titleOptions)}</Modal.Title>
      </Modal.Header>
      <ErrorBoundary>
        <Suspense fallback={<Loader style={{ minHeight: 200 }} />}>
          <Modal.Body>
            <ModalContent close={close} />
          </Modal.Body>
        </Suspense>
      </ErrorBoundary>
    </Modal>
  ) : (
    (null as any)
  )
}
