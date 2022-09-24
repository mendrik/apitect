import { blue, cyan, darkGray, lightGray, red, yellow } from 'ansicolor'
import { curry } from 'ramda'
import { log } from 'shrink-json'

const state = (state: string, color = cyan) => lightGray(`[${color(state.toUpperCase())}] `)
const writeToLog = log()
export const logger = {
  info: curry(<T>(message: string, obj?: T): T | undefined => {
    console.log(state('INFO') + lightGray(`${message}${obj ? ` ${writeToLog(obj)}` : ''}`))
    return obj
  }),
  message: curry(<T>(message: string, obj?: T): T | undefined => {
    console.log(state('MSG', blue) + lightGray(`${message}${obj ? ` ${writeToLog(obj)}` : ''}`))
    return obj
  }),
  error: curry(<T>(message: string, obj?: T): T | undefined => {
    console.log(state('ERROR', red) + red(`${message}${obj ? ` ${writeToLog(obj)}` : ''}`))
    return obj
  }),
  warn: curry(<T>(message: string, obj?: T): T | undefined => {
    console.warn(state('WARN') + yellow(`${message}${obj ? ` ${writeToLog(obj)}` : ''}`))
    return obj
  }),
  debug: curry(<T>(message: string, obj?: T): T | undefined => {
    console.debug(state('DEBUG') + darkGray(`${message}${obj ? ` ${writeToLog(obj)}` : ''}`))
    return obj
  })
}
