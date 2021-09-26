import { config as dotenv } from 'dotenv'

import { logger } from '../../utils/logger'

type Tag = 'PORT' | 'DATABASE_URL' | 'TOKEN_KEY'

export const config: Record<Tag, number | string> = dotenv({ path: '.server-env' }).parsed as any

logger.info('config', config)
