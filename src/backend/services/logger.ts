import { log } from 'shrink-json'
import { blue, red } from 'ansicolor'

export const logger = {
  log: log(),
  info: (message: string, obj: any) => console.log(blue(`INFO: ${message}: ` + logger.log(obj))),
  error: (message: string, obj: any) => console.log(red(`ERROR: ${message}: ` + logger.log(obj)))
}
