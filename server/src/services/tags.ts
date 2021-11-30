import { logger } from '~shared/utils/logger'

import { collection, Collections } from './database'

export const renameTag =
  (docId: string) =>
  (from: string, to: string): Promise<any> => {
    logger.info(`Renaming tag ${from} into ${to} in doc ${docId}`)
    return collection(Collections.userSettings).updateMany(
      { docId },
      { $set: { 'visibleTags.$[filter]': to } },
      { arrayFilters: [{ filter: from }] }
    )
  }
