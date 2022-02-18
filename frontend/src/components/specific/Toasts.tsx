import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { $notificationsStore } from '~stores/$notificationsStore'

import { slideIn } from '../../animations/slideIn'
import { removeNotification } from '../../events/notifications'

export const Toasts = () => {
  const notifications = useStore($notificationsStore)
  const { t } = useTranslation()

  return (
    <ToastContainer className="position-absolute top-0 end-0 h-100 p-2 ps-5 overflow-hidden d-flex justify-content-end flex-column">
      <AnimatePresence presenceAffectsLayout>
        {notifications.map(notification => (
          <motion.div {...slideIn} key={notification.id} layoutId={notification.id}>
            <Toast onClose={() => removeNotification(notification.id)} show>
              <Toast.Header>
                <strong className="me-auto">{t<any>(notification.title)}</strong>
              </Toast.Header>
              <Toast.Body>{t<any>(notification.content)}</Toast.Body>
            </Toast>
          </motion.div>
        ))}
      </AnimatePresence>
    </ToastContainer>
  )
}
