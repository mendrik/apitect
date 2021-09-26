import { isRight } from 'fp-ts/Either'
import * as t from 'io-ts'
import { OutputOf } from 'io-ts'
import { withValidate } from 'io-ts-types'
import { last } from 'ramda'

type Last<T> = T extends readonly [...infer _I, infer U] ? U : any

// wip or find out a ready made solution for this
export const chainCodec = <C extends t.Any, X extends C[]>(...codecs: X): Last<X> =>
  withValidate<t.TypeOf<C>>(codecs, (input: OutputOf<C>, ctx: t.Context) =>
    codecs.reduce((p, c) => {
      if (isRight(p)) {
        const validation = c.validate(input, ctx)
        return isRight(validation)
          ? t.success(input)
          : t.failure(input, ctx, last(validation.left)?.message)
      }
      return p
    }, t.success(input))
  )
