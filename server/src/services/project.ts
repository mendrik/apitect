import { isNil, path } from 'ramda'
import { failOn } from '~shared/utils/failOn'
import { logger } from '~shared/utils/logger'

import { collection, Collections, withTransaction } from './database'

export const renameProject = (docId: string, name: string): Promise<string> =>
  withTransaction(
    async session =>
      await collection(Collections.documents)
        .findOneAndUpdate({ id: docId }, { $set: { name } }, { session, returnDocument: 'after' })
        .then(path(['value', 'name']))
        .then(failOn<string>(isNil))
        .then(logger.info(`Renamed project with doc ${docId}`))
  )
