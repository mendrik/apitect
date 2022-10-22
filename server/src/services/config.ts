import { config as dotenv } from 'dotenv'

export type Tag = 'PORT' | 'TOKEN_KEY' | 'SALT' | 'DATABASE' | 'MONGO_INITDB_DATABASE'

export const config = dotenv({ path: '.server-env' }).parsed!
