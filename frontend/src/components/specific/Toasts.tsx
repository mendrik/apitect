import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { chain, cond, prop, propEq, T } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZodError, ZodIssue } from 'zod'
import { Notification, NotificationType } from '~shared/types/domain/notification'
import { matches, safeParseJson } from '~shared/utils/ramda'
import { $notificationsStore } from '~stores/$notificationsStore'

import { slideIn } from '../../animations/slideIn'
import { removeNotification } from '../../events/notifications'
import { goToValue } from '../../events/values'
import { LinkButton } from '../generic/LinkButton'
import { NotEmptyList } from '../generic/NotEmptyList'

const isValidation = propEq('type', NotificationType.VALIDATION)

const Errors = styled.ul`
  margin-bottom: 0;
  padding-left: 1.5rem;
`

const getValidationErrors = (n: Notification): JSX.Element => {
  const errors = safeParseJson<{ errors: ZodError[] }>(n.content)?.errors ?? []
  const issues: ZodIssue[] = chain(prop('issues'), errors)
  return (
    <NotEmptyList list={issues} as={Errors}>
      {mapIndexed((issue, idx) => (
        <li key={idx}>
          {issue.message}, show{' '}
          <LinkButton action={() => goToValue(issue.path[1] as string)}>problem</LinkButton>.
        </li>
      ))}
    </NotEmptyList>
  )
}

const notificationContent = cond<[Notification], JSX.Element>([
  [matches(isValidation), getValidationErrors],
  [T, n => <div>{n.content}</div>]
])

export const Toasts = () => {
  const notifications = useStore($notificationsStore)
  const { t } = useTranslation()

  return (
    <ToastContainer className="position-absolute top-0 end-0 h-100 p-2 ps-5 overflow-hidden d-flex justify-content-end flex-column gap-2">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div {...slideIn} key={notification.uniqueId}>
            <Toast onClose={() => removeNotification(notification.uniqueId)} show>
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
