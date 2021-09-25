import { isRight } from 'fp-ts/Either'
import i18n from 'i18next'
import * as t from 'io-ts'
import { OutputOf } from 'io-ts'
import { withValidate } from 'io-ts-types'
import { complement, isEmpty, last } from 'ramda'
import { TFuncKey } from 'react-i18next'

export const validationCodec = <C extends t.Any>(
  codec: C,
  validate: (d: OutputOf<C>) => boolean,
  message?: TFuncKey
): C =>
  withValidate<t.TypeOf<C>>(codec, (input: OutputOf<C>, ctx: t.Context) => {
    const validation = codec.validate(input, ctx)
    return isRight(validation) && validate(validation.right)
      ? t.success(input)
      : t.failure(input, ctx, message ? i18n.t(message, { field: last(ctx)?.key }) : undefined)
  })

export const nonEmptyString = validationCodec(
  t.string,
  complement(isEmpty),
  'form.validation.required'
)
