import { useStore } from 'effector-react'
import { mapIndexed } from 'ramda-adjunct'
import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { $notificationsStore } from '~stores/$notificationsStore'

import { NotEmptyList } from '../generic/NotEmptyList'

export const Toasts = () => {
  const notifications = useStore($notificationsStore)
  const { t } = useTranslation()

  return (
    <ToastContainer>
      <NotEmptyList list={notifications} as={() => <ToastContainer />}>
        {mapIndexed(notification => (
          <Toast key={notification.title}>
            <Toast.Header>
              <strong className="me-auto">{t<any>(notification.title)}</strong>
            </Toast.Header>
            <Toast.Body>{t<any>(notification.content)}</Toast.Body>
          </Toast>
        ))}
      </NotEmptyList>
    </ToastContainer>
  )
}
