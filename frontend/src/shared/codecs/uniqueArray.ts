import { converge, equals, identity, Pred, uniqBy } from 'ramda'
import { array, ParseParams } from 'zod'
import { ZodTypeAny } from 'zod/lib/types'

export const uniqueArray = <T extends ZodTypeAny>(pred: Pred, schema: T, params?: ParseParams) =>
  array(schema, params).refine(
    arr => converge(equals, [identity, uniqBy(pred)])(arr),
    'form.validation.uniqueElements'
  )
