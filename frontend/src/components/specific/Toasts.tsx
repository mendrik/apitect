import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { mapIndexed } from 'ramda-adjunct'
import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ZodError } from 'zod'
import { Notification } from '~shared/types/domain/notification'
import { safeParseJson } from '~shared/utils/ramda'
import { $notificationsStore } from '~stores/$notificationsStore'

import { slideIn } from '../../animations/slideIn'
import { removeNotification } from '../../events/notifications'
import { NotEmptyList } from '../generic/NotEmptyList'

const notificationContent = (notification: Notification): JSX.Element => {
  switch (notification.title) {
    case 'validation.failed':
      const error = safeParseJson<ZodError>(notification.content)
      return (
        <NotEmptyList list={error?.issues}>
          {mapIndexed(issue => {
            const key = issue.path.join('/')
            return (
              <li key={key}>
                {key}: {issue.message}
              </li>
            )
          })}
        </NotEmptyList>
      )
  }
  return <div>{notification.content}</div>
}

export const Toasts = () => {
  const notifications = useStore($notificationsStore)
  const { t } = useTranslation()

  return (
    <ToastContainer className="position-absolute top-0 end-0 h-100 p-2 ps-5 overflow-hidden d-flex justify-content-end flex-column">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div {...slideIn} key={notification.id}>
            <Toast onClose={() => removeNotification(notification.id)} show autohide>
              <Toast.Header>
                <strong className="me-auto">{t<any>(notification.title)}</strong>
              </Toast.Header>
              <Toast.Body>{notificationContent(notification)}</Toast.Body>
            </Toast>
          </motion.div>
        ))}
      </AnimatePresence>
    </ToastContainer>
  )
}
