import { config as dotenv } from 'dotenv'

type Tag = 'PORT' | 'TOKEN_KEY' | 'SALT' | 'DATABASE' | 'MONGO_INITDB_DATABASE'

export const config: Record<Tag, number | string> = dotenv({ path: '.server-env' }).parsed as any

// logger.info('config', config)