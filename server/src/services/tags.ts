import { logger } from '~shared/utils/logger'

export const renameTag =
  (docId: string) =>
  (from: string, to: string): Promise<void> => {
    logger.info(`Renaming tag ${from} into ${to} in doc ${docId}`)
    return Promise.resolve()
  }
