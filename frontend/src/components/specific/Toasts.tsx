import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { mapIndexed } from 'ramda-adjunct'
import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { $notificationsStore } from '~stores/$notificationsStore'

import { SlideInTransitionComponent } from '../../animations/slideIn'
import { removeNotification } from '../../events/notifications'
import { NotEmptyList } from '../generic/NotEmptyList'

export const Toasts = () => {
  const notifications = useStore($notificationsStore)
  const { t } = useTranslation()

  console.log(notifications)

  return (
    <ToastContainer className="position-absolute p-2" position="bottom-end">
      <AnimatePresence>
        <NotEmptyList list={notifications}>
          {mapIndexed((notification, idx) => (
            <Toast
              key={idx}
              onClose={() => removeNotification(notification)}
              transition={SlideInTransitionComponent}
            >
              <Toast.Header>
                <strong className="me-auto">{t<any>(notification.title)}</strong>
              </Toast.Header>
              <Toast.Body>{t<any>(notification.content)}</Toast.Body>
            </Toast>
          ))}
        </NotEmptyList>
      </AnimatePresence>
    </ToastContainer>
  )
}
