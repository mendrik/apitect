import { isRight } from 'fp-ts/Either'
import { Context, Errors, Type, Validation } from 'io-ts'
import { join, last, map, pathOr, prop } from 'ramda'

import { logger } from './logger'

export const getPath = (ctx: Context): string => join('/', map(prop('key') as () => string, ctx))
const getExpected = (ctx: Context): string => pathOr('?', ['type', 'name'], last(ctx) ?? {})

const formatDecodingErrors = (
  errs: Errors
): { path: string; expected: unknown; actual: unknown }[] =>
  errs.map(err => {
    const expected = getExpected(err.context)
    return {
      path: getPath(err.context),
      expected: expected.startsWith('{') ? 'Type' : expected,
      actual: err.value
    }
  })

export const logDecodingErrorsTable = (errs: Errors): void => {
  console.table(formatDecodingErrors(errs), ['path', 'expected', 'actual'])
}

export class DecodingError extends Error {}

export const decode =
  <A, O = A, I = unknown>(decoder: Type<A, O, I>) =>
  (data: I): A => {
    const decoded: Validation<A> = decoder.decode(data)
    if (isRight(decoded)) {
      return decoded.right
    }
    logger.info('Received not decodeable data', data)
    logDecodingErrorsTable(decoded.left)
    throw new DecodingError('Decoding failed')
  }
