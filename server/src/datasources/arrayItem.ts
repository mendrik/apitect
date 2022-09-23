import { prop } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { ZodError } from 'zod'
import { Id } from '~shared/types/domain/id'
import { NotificationType } from '~shared/types/domain/notification'
import { Value } from '~shared/types/domain/values/value'
import { notificationError } from '~shared/types/notificationError'

import { validateNode, Validation } from '../services/validation'

export const validateValues = async (
  docId: Id,
  email: string,
  tag: string,
  arrayNodeId: Id
): Promise<Value[]> => {
  const result = await validateNode(docId, tag, arrayNodeId, email)

  const errors = result.reduce(
    (acc: ZodError[], res: Validation) => (res.success ? acc : [...acc, res.error]),
    []
  )

  if (isNotEmpty(errors)) {
    throw notificationError(
      arrayNodeId,
      'validation.failed',
      NotificationType.WARNING,
      JSON.stringify({ errors })
    )
  }

  return result.map(prop('data')) as Value[]
}
