import { NotificationType } from '~shared/types/domain/notification'

export class NotificationError extends Error {
  constructor(public title: string, public type: NotificationType, content: string) {
    super(content)
  }
}

export const notificationError = (title: string, type: NotificationType, content: string) =>
  new NotificationError(title, type, content)
