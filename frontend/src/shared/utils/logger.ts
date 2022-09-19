import { blue, cyan, darkGray, lightGray, red, yellow } from 'ansicolor'
import { log } from 'shrink-json'

const state = (state: string, color = cyan) => lightGray(`[${color(state.toUpperCase())}] `)
export const logger = {
  log: log(),
  info: (message: string, obj?: any) =>
    console.log(state('INFO') + lightGray(`${message}${obj ? ` ${logger.log(obj)}` : ''}`)),
  message: (message: string, obj?: any) =>
    console.log(state('MSG', blue) + lightGray(`${message}${obj ? ` ${logger.log(obj)}` : ''}`)),
  error: (message: string, obj?: any) =>
    console.log(state('ERROR', red) + red(`${message}${obj ? ` ${logger.log(obj)}` : ''}`)),
  warn: (message: string, obj?: any) =>
    console.warn(state('WARN') + yellow(`${message}${obj ? ` ${logger.log(obj)}` : ''}`)),
  debug: (message: string, obj?: any) =>
    console.debug(state('DEBUG') + darkGray(`${message}${obj ? ` ${logger.log(obj)}` : ''}`))
}
