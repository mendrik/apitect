import { assoc, dropLast } from 'ramda'
import { AnyZodObject, preprocess, ZodArray } from 'zod'
import { ZodEffects } from 'zod/lib/types'
import { asNumber } from '~shared/utils/ramda'

/**
 * won't validate the last element in obj[arrayProp] unless selectionProp points to it.
 * @param obj
 */
export const lastItemOptional = <T extends AnyZodObject>(obj: T): ZodEffects<T> => {
  const arrayProp: string = Object.keys(obj.shape).find(key => obj.shape[key] instanceof ZodArray)!
  return preprocess(
    (o: any) =>
      asNumber(o['selection']) === o[arrayProp].length - 1
        ? o
        : assoc(arrayProp, dropLast(1, o[arrayProp]), o),
    obj
  )
}
