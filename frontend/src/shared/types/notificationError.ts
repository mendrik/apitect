import { NotificationType } from '~shared/types/domain/notification'

export class NotificationError extends Error {
  constructor(
    public uniqueId: string,
    public title: string,
    public type: NotificationType,
    content: string
  ) {
    super(content)
  }
}

export const notificationError = (
  uniqueId: string,
  title: string,
  type: NotificationType,
  content: string
) => new NotificationError(uniqueId, title, type, content)
