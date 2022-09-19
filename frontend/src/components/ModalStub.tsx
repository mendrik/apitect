import { BaseModalProps } from '@restart/ui/Modal'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useLocation } from '~hooks/useLocation'
import { useQueryParams } from '~hooks/useQueryParams'
import { Fn } from '~shared/types/generic'
import { ModalNames } from '~shared/types/modals'

import { $moduleError, $moduleStore, clearModuleFx, Import, loadModuleFx } from '../events/import'
import { removeParams } from '../utils/url'
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
}: OwnProps): JSX.Element | null => {
  const { state } = useLocation<Record<string, string>>()
  const { modal } = useQueryParams()
  const modalMatch = modal === name

  const { t } = useTranslation()
  const navigate = useNavigate()
  const Module = useStore($moduleStore)
  const loading = useStore(loadModuleFx.pending)
  const error = useStore($moduleError)

  if (error) {
    throw Error()
  }

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
          <Modal.Title>{t<any>(title, titleOptions ?? state)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? <Loader style={{ minHeight: 200 }} /> : <Module close={close} />}
        </Modal.Body>
      </Modal>
    )
  )
}

export { ModalStub }
