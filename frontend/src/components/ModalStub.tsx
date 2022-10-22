import { BaseModalProps } from '@restart/ui/Modal'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { FunctionComponent } from 'react'
import { Modal } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { ModalNames } from '~shared/types/modals'
import { $modalStore } from '~stores/$modalStore'

import { closeModal } from '../events/modals'

type OwnProps = {
  content: FunctionComponent<any>
  name: ModalNames
  title: TFuncKey
  titleOptions?: Record<string, string>
} & BaseModalProps

const ModalStub = ({
  name,
  content: Content,
  title,
  titleOptions,
  className,
  ...modalProps
}: OwnProps): JSX.Element | null => {
  const modal = useStore($modalStore)
  const modalMatch = modal?.name === name
  const { t } = useTranslation()

  return (
    <Modal
      show={modalMatch}
      centered
      onHide={closeModal}
      key={name}
      enforceFocus
      className={clsx('custom-scrollbars', className)}
      restoreFocus
      {...modalProps}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t<any>(title, titleOptions ?? modal?.params)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Content />
      </Modal.Body>
    </Modal>
  )
}

export { ModalStub }
