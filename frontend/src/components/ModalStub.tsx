import { F, prop } from 'ramda'
import React, { Suspense, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Fn, Jsx } from 'shared/types/generic'
import { removeParams } from 'shared/utils/url'

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
}

export const ModalStub = ({
  name,
  from,
  title,
  titleOptions
}: Jsx<OwnProps>): JSX.Element | null => {
  const { modal } = useQueryParams()
  const modalMatch = modal === name

  const { t } = useTranslation()
  const navigate = useNavigate()

  const { result: ModalContent, trigger } = usePromise(() => from().then(prop('default')))
  useEffect(modalMatch ? trigger : F, [modalMatch, trigger])

  const close = () => {
    navigate(removeParams(['modal']), { replace: true })
  }

  return ModalContent != null ? (
    <Modal show={true} onExited={close} centered enforceFocus>
      <Modal.Header closeButton>
        <Modal.Title>{t(title, titleOptions)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<Loader style={{ minHeight: 200 }} />}>
          <ErrorContext>
            <ModalContent close={close} />
          </ErrorContext>
        </Suspense>
      </Modal.Body>
    </Modal>
  ) : null
}
