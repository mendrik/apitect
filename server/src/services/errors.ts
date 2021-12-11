import { join, pipe, split, test, takeLastWhile } from 'ramda'

export const getStack = (e: Error) =>
  pipe(split('\n'), takeLastWhile(test(/^\s*at/)), join('\n'))(e.stack ?? '')
