import { either, path, pathEq, propEq, propSatisfies } from 'ramda'
import { included } from 'ramda-adjunct'

export const codeIs = (...keys: string[]) => propSatisfies(included(keys), 'code')
export const withShift = propEq('shiftKey', true)
export const keyIs = (...keys: string[]) => propSatisfies(included(keys), 'key')
export const eventValue = path(['target', 'value'])
export const eventValueIs = <T>(val: T) => pathEq(['target', 'value'], val)
export const spaceOrEnter = either(codeIs('Space'), keyIs('Enter'))
