import { nativeEnum, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { idCodec } from '~shared/codecs/idCodec'

export enum NotificationType {
  INFO,
  ERROR,
  WARNING
}

export const ZNotification = object({
  uniqueId: idCodec,
  title: string(),
  content: string(),
  type: nativeEnum(NotificationType)
})

export type Notification = TypeOf<typeof ZNotification>
