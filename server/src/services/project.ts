import { isNil, path } from 'ramda'
import { failOn } from '~shared/utils/failOn'
import { logger } from '~shared/utils/logger'

import { collection, Collections, withTransaction } from './database'

export const renameProject = (docId: string, name: string): Promise<string> =>
  withTransaction(async session => {
    logger.info(`Renaming project with doc ${docId} to ${name}`)
    return await collection(Collections.documents)
      .findOneAndUpdate({ docId }, { name }, { session, returnDocument: 'after' })
      .then(path(['value', 'name']))
      .then(failOn<string>(isNil))
  })
