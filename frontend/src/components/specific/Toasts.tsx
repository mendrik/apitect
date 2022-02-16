import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { mapIndexed } from 'ramda-adjunct'
import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { $notificationsStore } from '~stores/$notificationsStore'

import { slideIn } from '../../animations/slideIn'
import { removeNotification } from '../../events/notifications'
import { NotEmptyList } from '../generic/NotEmptyList'

export const Toasts = () => {
  const notifications = useStore($notificationsStore)
  const { t } = useTranslation()

  return (
    <ToastContainer className="position-absolute p-2 ps-5 overflow-hidden" position="bottom-end">
      <AnimatePresence presenceAffectsLayout exitBeforeEnter>
        <NotEmptyList list={notifications}>
          {mapIndexed((notification, idx) => (
            <motion.div {...slideIn} layoutId={notification.id}>
              <Toast onClose={() => removeNotification(notification.id)} show animation={false}>
                <Toast.Header>
                  <strong className="me-auto">{t<any>(notification.title)}</strong>
                </Toast.Header>
                <Toast.Body>{t<any>(notification.content)}</Toast.Body>
              </Toast>
            </motion.div>
          ))}
        </NotEmptyList>
      </AnimatePresence>
    </ToastContainer>
  )
}
