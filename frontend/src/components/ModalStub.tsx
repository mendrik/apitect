import { BaseModalProps } from '@restart/ui/Modal'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import React, { Suspense, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useLocation } from '~hooks/useLocation'
import { useQueryParams } from '~hooks/useQueryParams'
import { Fn, Jsx } from '~shared/types/generic'
import { ModalNames } from '~shared/types/modals'

import { $moduleStore, clearModuleFx, Import, loadModuleFx } from '../events/import'
import { removeParams } from '../utils/url'
import { ErrorContext } from './generic/ErrorContext'
import { Loader } from './generic/Loader'

export type ModalFC = ({ close }: { close: Fn }) => JSX.Element | null

type OwnProps = {
  from: Import<ModalFC>
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
  className,
  ...modalProps
}: Jsx<OwnProps>): JSX.Element | null => {
  const { state } = useLocation<Record<string, string>>()
  const { modal } = useQueryParams()
  const modalMatch = modal === name

  const { t } = useTranslation()
  const navigate = useNavigate()
  const Module = useStore($moduleStore)

  useEffect(() => {
    if (modalMatch) {
      void loadModuleFx(from)
    }
  }, [from, modalMatch])

  const close = () => {
    navigate(removeParams(['modal']), { replace: true })
    clearModuleFx()
  }

  return (
    Module && (
      <Modal
        show={modalMatch}
        centered
        onHide={close}
        key={name}
        className={clsx('custom-scrollbars', className)}
        {...modalProps}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t(title, titleOptions ?? state)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorContext>
            <Suspense fallback={<Loader style={{ minHeight: 200 }} />}>
              <Module close={close} />
            </Suspense>
          </ErrorContext>
        </Modal.Body>
      </Modal>
    )
  )
}

export { ModalStub }
