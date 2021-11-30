import { BaseModalProps } from '@restart/ui/Modal'
import { prop } from 'ramda'
import React, { Suspense, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fn, Jsx } from 'shared/types/generic'
import { removeParams } from 'shared/utils/url'

import useProgress from '../hooks/useProgress'
import { usePromise } from '../hooks/usePromise'
import { useQueryParams } from '../hooks/useQueryParams'
import { ModalNames } from '../shared/types/modals'
import { ErrorContext } from './generic/ErrorContext'
import { Loader } from './generic/Loader'

export type ModalFC = ({ close }: { close: Fn }) => JSX.Element | null

type OwnProps = {
  from: () => Promise<{ default: ModalFC }>
  name: ModalNames
  title: TFuncKey
  titleOptions?: Record<string, string>
} & BaseModalProps

const ModalStub = ({
  name,
  from,
  title,
  titleOptions,
  enforceFocus = true,
  ...modalProps
}: Jsx<OwnProps>): JSX.Element | null => {
  const { state } = useLocation()
  const { modal } = useQueryParams()
  const modalMatch = modal === name

  const { t } = useTranslation()
  const navigate = useNavigate()

  const [withProgress, status] = useProgress<ModalFC>()
  const trigger = usePromise(() => withProgress(from().then(prop('default'))))
  useEffect(() => {
    if (status.is === 'idle' && modalMatch) {
      trigger()
    }
  }, [status, modalMatch])

  const close = () => {
    navigate(removeParams(['modal']), { replace: true })
  }

  return status.is === 'done' ? (
    <Modal show={modalMatch} centered onHide={close} key={name} {...modalProps}>
      <Modal.Header closeButton>
        <Modal.Title>{t(title, titleOptions ?? state)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorContext>
          <Suspense fallback={<Loader style={{ minHeight: 200 }} />}>
            <status.result close={close} />
          </Suspense>
        </ErrorContext>
      </Modal.Body>
    </Modal>
  ) : null
}

export { ModalStub }
