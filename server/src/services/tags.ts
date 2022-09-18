import { MatchKeysAndValues } from 'mongodb'
import { UserSettings } from '~shared/types/forms/userSettings'
import { logger } from '~shared/utils/logger'

import { collection, Collections, withTransaction } from './database'

export const renameTag =
  (docId: string) =>
  (from: string, to: string): Promise<any> =>
    withTransaction(async session => {
      logger.info(`Renaming tag ${from} into ${to} in doc ${docId}`)
      await collection(Collections.values).updateMany(
        { docId, tag: from },
        { $set: { tag: to } },
        { session }
      )
      return collection(Collections.userSettings).updateMany(
        { docId },
        { $set: { 'visibleTags.$[filter]': to } as MatchKeysAndValues<UserSettings> },
        { arrayFilters: [{ filter: from }], session }
      )
    })
