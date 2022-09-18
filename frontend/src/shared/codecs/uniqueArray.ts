import { equals, Pred, uniqBy } from 'ramda'
import { Refinement, RefinementCtx, ZodIssueCode } from 'zod'

export const uniqueArray =
  <T extends any[]>(pred: Pred): Refinement<T> =>
  (arr, ctx: RefinementCtx) => {
    const unique = equals(uniqBy(pred, arr), arr)
    if (!unique) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'form.validation.uniqueElements'
      })
    }
  }
