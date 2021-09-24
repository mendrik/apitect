import { config as dotenv } from 'dotenv'

type Tag = 'PORT' | 'DATABASE_URL' | 'TOKEN_KEY' | 'PASSWORD_SALT'

export const config: Record<Tag, number | string> = dotenv({ path: '.server-env' }).parsed as any
