import { nativeEnum, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

export enum NotificationType {
  INFO,
  ERROR,
  WARNING
}

export const ZNotification = object({
  title: string(),
  content: string(),
  type: nativeEnum(NotificationType)
})

export type Notification = TypeOf<typeof ZNotification>
