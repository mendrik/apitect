import { config as dotenv } from 'dotenv'

type Tag = 'PORT' | 'TOKEN_KEY' | 'SALT' | 'DB_USER' | 'DB_PASS' | 'DB_NAME' | 'DB_HOST' | 'DB_PORT'

export const config: Record<Tag, number | string> = dotenv({ path: '.server-env' }).parsed as any

// logger.info('config', config)