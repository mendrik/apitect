import { blue, red } from 'ansicolor'
import { log } from 'shrink-json'

export const logger = {
  log: log(),
  info: (message: string, obj: any) =>
    console.log(blue(`INFO: ${message}${obj ? ` ${logger.log(obj)}` : ''}`)),
  error: (message: string, obj: any) =>
    console.log(red(`ERROR: ${message}${obj ? ` ${logger.log(obj)}` : ''}`)),
  warn: (message: string, obj: any) =>
    console.warn(red(`WARN: ${message}${obj ? ` ${logger.log(obj)}` : ''}`)),
  debug: (message: string, obj: any) =>
    console.debug(red(`DEBUG: ${message}${obj ? ` ${logger.log(obj)}` : ''}`))
}
